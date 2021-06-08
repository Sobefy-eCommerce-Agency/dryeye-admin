import { useEffect, useMemo } from "react";
import {
  Box,
  Center,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  MenuOptionGroup,
  MenuItemOption,
  IconButton,
} from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import useGeolocation from "../../../hooks/useGeolocation";
import { PracticesApi } from "../../../configuration/axiosInstances";
import { useLocator, Action } from "../../context/locatorContext";
import LocatorMarker from "./Marker/Marker";
import { Practice } from "../../../types/interfaces/practices";
import Filter from "./Filter/Filter";
import PlacesAutocomplete from "./PlacesAutocomplete/PlacesAutocomplete";
import MultiSelect from "./MultiSelect/MultiSelect";
import {
  sortByBooleanProperty,
  isLocationInsideRadius,
} from "../../../utils/utils";
import { FormatCheckBoxData, getUniqueProducts } from "../../../utils/format";
import InfoPopover from "./InfoPopover/InfoPopover";
import { Center as CenterType } from "../../../types/commons/commons";
import useCurrentLocations from "../../../hooks/useCurrentLocations";
import { IoLocationSharp } from "react-icons/io5";

interface MapProps {
  handleActivateLocation(location: Practice | null): void;
  treatmentsAndServices: any[] | null;
  myDoctors: any[] | null;
}

const Map = ({
  handleActivateLocation,
  treatmentsAndServices,
  myDoctors,
}: MapProps) => {
  const { state, dispatch } = useLocator();
  const [loading, location] = useGeolocation();

  // State
  const {
    center,
    zoom,
    noResultsFound,
    geoFilteredLocations,
    activeLocation,
    dryEyeTreatmentsFilter,
    eyeCareServicesFilter,
    dryEyeProductsFilter,
    practiceNameFilter,
    doctorsFilter,
    searchRadius,
    locations,
  } = state;

  const currentLocations = useCurrentLocations();

  const dryEyeTreatments = treatmentsAndServices?.filter(
    (el) => el.type === "treatment"
  );
  const formattedDryEyeTreatments = dryEyeTreatments
    ? FormatCheckBoxData(dryEyeTreatments, "dryEyeTreatments")
    : [];

  const eyeCareServices = treatmentsAndServices?.filter(
    (el) => el.type === "service"
  );
  const formattedEyeCareServices = eyeCareServices
    ? FormatCheckBoxData(eyeCareServices, "eyeCareServices")
    : [];

  // REFACTOR: Remove duplicates
  const formattedMyDoctors = myDoctors
    ? FormatCheckBoxData(myDoctors, "myDoctors")
    : [];

  const dryEyeProducts = useMemo(
    () => getUniqueProducts(currentLocations),
    [currentLocations]
  );

  // Handlers
  const changeFilter = (action: Action) => {
    dispatch(action);
    dispatch({
      type: "setActiveLocation",
      location: null,
    });
  };

  const selectPlacesAutocomplete = (
    center: CenterType | null,
    calculateAgain: boolean = false,
    radius: string | null = null
  ) => {
    if (center) {
      dispatch({
        type: "setCenter",
        center: center,
      });
      dispatch({
        type: "setZoom",
        zoom: 10,
      });
      const loc = calculateAgain ? locations : currentLocations;
      if (loc) {
        const geoLocations = loc.filter((loc) => {
          if (loc.latitude && loc.longitude) {
            return isLocationInsideRadius(radius || searchRadius, center, {
              lat: loc.latitude,
              lng: loc.longitude,
            });
          }
          return false;
        });
        if (geoLocations.length > 0) {
          dispatch({
            type: "setGeoFilteredLocations",
            locations: geoLocations,
          });
        }
      }
    } else {
      dispatch({
        type: "setGeoFilteredLocations",
        locations: null,
      });
    }
  };

  // Side effects
  useEffect(() => {
    PracticesApi.get(undefined, true).then((response: { data: Practice[] }) => {
      const { data } = response;
      if (data) {
        const sortByPartner = sortByBooleanProperty(data, "partner");
        const sortByProvider = sortByBooleanProperty(sortByPartner, "provider");
        const sortByProviderPlus = sortByBooleanProperty(
          sortByProvider,
          "providerPlus"
        );
        dispatch({
          type: "setLocations",
          locations: sortByProviderPlus,
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (location) {
      const newCenter = { lat: location.latitude, lng: location.longitude };
      dispatch({
        type: "setCenter",
        center: newCenter,
      });
      dispatch({
        type: "setZoom",
        zoom: 10,
      });
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newCenter }, (results, status) => {
        if (status === "OK" && results[0]) {
          console.log(results[0].formatted_address);
        }
      });
      if (locations && !loading) {
        selectPlacesAutocomplete(newCenter, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch, loading, locations]);

  useEffect(() => {
    let newLocations: Practice[] | null = null;
    if (
      dryEyeTreatmentsFilter ||
      eyeCareServicesFilter ||
      practiceNameFilter ||
      dryEyeProductsFilter ||
      doctorsFilter
    ) {
      const results = currentLocations?.filter((loc) => {
        const currentDryEyeTreatments = loc.dryEyeTreatments;
        const currentEyeCareServices = loc.eyeCareServices;
        const currentPracticeName = loc.name.toLowerCase();
        const currentDryEyeProducts = loc.dryEyeProducts;
        const currentDoctors = loc.doctors;
        let treatmentsIncluded = false;
        let servicesIncluded = false;
        let practiceNameIncluded = false;
        let productsIncluded = false;
        let doctorsIncluded = false;
        // Filter Dry Eye Treatments
        if (dryEyeTreatmentsFilter && dryEyeTreatmentsFilter.length > 0) {
          if (currentDryEyeTreatments && currentDryEyeTreatments.length > 0) {
            dryEyeTreatmentsFilter?.forEach((filter) => {
              treatmentsIncluded = currentDryEyeTreatments.includes(
                filter.value
              );
            });
          }
        }
        // Filter Eye Care Services
        if (eyeCareServicesFilter && eyeCareServicesFilter.length > 0) {
          if (currentEyeCareServices && currentEyeCareServices.length > 0) {
            eyeCareServicesFilter?.forEach((filter) => {
              servicesIncluded = currentEyeCareServices.includes(filter.value);
            });
          }
        }
        // Filter by practice name
        if (practiceNameFilter) {
          practiceNameIncluded = currentPracticeName.includes(
            practiceNameFilter.toLocaleLowerCase()
          );
        }
        // Filter by Dry Eye Products
        if (
          dryEyeProductsFilter &&
          dryEyeProductsFilter.length > 0 &&
          currentDryEyeProducts &&
          typeof currentDryEyeProducts !== "string"
        ) {
          dryEyeProductsFilter?.forEach((filter) => {
            const filteredProducts = currentDryEyeProducts
              ? currentDryEyeProducts.filter(
                  (prod) => String(prod.id) === filter.value
                )
              : [];
            productsIncluded = filteredProducts.length > 0;
          });
        }
        // Filter Doctor names
        if (
          doctorsFilter &&
          doctorsFilter.length > 0 &&
          currentDoctors &&
          typeof currentDoctors !== "string"
        ) {
          doctorsFilter?.forEach((filter) => {
            const filteredDoctors = currentDoctors
              ? currentDoctors.filter(
                  (dr) =>
                    `${dr.firstName?.trim()} ${dr.lastName?.trim()}` ===
                    filter.value
                )
              : [];
            doctorsIncluded = filteredDoctors.length > 0;
          });
        }

        // Check results
        const resultIncluded =
          treatmentsIncluded ||
          servicesIncluded ||
          practiceNameIncluded ||
          productsIncluded ||
          doctorsIncluded;

        if (resultIncluded) {
          return true;
        }
        return false;
      });

      if (results && results.length === 0) {
        dispatch({
          type: "setNoResultsFound",
          noResultsFound: true,
        });
      } else {
        dispatch({
          type: "setNoResultsFound",
          noResultsFound: false,
        });
      }
      newLocations = results && results.length > 0 ? results : null;
      dispatch({
        type: "setFilteredLocations",
        locations: newLocations,
      });
    } else if (
      geoFilteredLocations.active === false &&
      geoFilteredLocations.locations !== null
    ) {
      dispatch({
        type: "setGeoFilteredLocations",
        locations: geoFilteredLocations.locations,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dryEyeTreatmentsFilter,
    eyeCareServicesFilter,
    dryEyeProductsFilter,
    doctorsFilter,
    practiceNameFilter,
    searchRadius,
  ]);

  // Options
  const mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
  };

  // Styles
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <Box>
      <Box maxWidth="1480px" margin="auto" position="relative">
        <Box
          background="white"
          position={{ base: "relative", md: "absolute" }}
          top={{ base: 0, md: 4 }}
          zIndex={999}
          py={4}
          px={6}
          borderRadius={{ base: 0, md: 6 }}
          boxShadow="xl"
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr 1fr 1fr 1fr 1fr 40px",
          }}
          gridColumnGap={2}
          gridRowGap={{ base: 2, md: 0 }}
          width="full"
        >
          <Filter
            placeholder="Practice Name"
            type="text"
            value={practiceNameFilter}
            onChange={(value) =>
              dispatch({
                type: "setPracticeNameFilter",
                name: value,
              })
            }
          />
          <MultiSelect
            name="Doctor Name"
            placeholder="Doctor Name"
            options={formattedMyDoctors || []}
            value={doctorsFilter}
            onSelect={(values: any[]) =>
              changeFilter({
                type: "setDoctorsFilter",
                filters: values && values.length > 0 ? values : null,
              })
            }
          />
          <PlacesAutocomplete
            id="location_filter"
            placeholder="Zip code, City, State"
            onSelect={(center) => selectPlacesAutocomplete(center)}
          />
          <MultiSelect
            name="DryEye Treatments"
            placeholder="Treatments"
            options={formattedDryEyeTreatments || []}
            value={dryEyeTreatmentsFilter}
            onSelect={(values: any[]) =>
              changeFilter({
                type: "setDryEyeTreatmentsFilter",
                filters: values && values.length > 0 ? values : null,
              })
            }
          />
          <MultiSelect
            name="Eye Care Services"
            placeholder="Services"
            options={formattedEyeCareServices || []}
            value={eyeCareServicesFilter}
            onSelect={(values: any[]) =>
              changeFilter({
                type: "setEyeCareServicesFilter",
                filters: values && values.length > 0 ? values : null,
              })
            }
          />
          <MultiSelect
            name="Dry Eye Products"
            placeholder="Products"
            options={dryEyeProducts}
            value={dryEyeProductsFilter}
            onSelect={(values: any[]) =>
              changeFilter({
                type: "setDryEyeProductsFilter",
                filters: values && values.length > 0 ? values : null,
              })
            }
          />
          <Menu placement="left-start">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<IoLocationSharp />}
              variant="outline"
            />
            <MenuList minWidth="240px">
              <MenuOptionGroup
                defaultValue="asc"
                title="Search radius"
                type="radio"
                value={searchRadius}
                onChange={(value) => {
                  if (typeof value === "string") {
                    dispatch({ type: "setSearchRadius", radius: value });
                    selectPlacesAutocomplete(center, true, value);
                  }
                }}
              >
                <MenuItemOption value="5">5 mi</MenuItemOption>
                <MenuItemOption value="10">10 mi</MenuItemOption>
                <MenuItemOption value="20">20 mi</MenuItemOption>
                <MenuItemOption value="50">50 mi</MenuItemOption>
                <MenuItemOption value="100">100 mi</MenuItemOption>
                <MenuItemOption value="200">200 mi</MenuItemOption>
                <MenuItemOption value="300">300 mi</MenuItemOption>
                <MenuItemOption value="400">400 mi</MenuItemOption>
                <MenuItemOption value="500">500 mi</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Box width="full" height={600}>
        {!loading && currentLocations ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom}
            options={mapOptions}
          >
            {currentLocations && !noResultsFound
              ? currentLocations.map((loc) => (
                  <LocatorMarker
                    key={loc.practice}
                    location={loc}
                    onClick={(location: Practice) =>
                      handleActivateLocation(location)
                    }
                  />
                ))
              : null}
            <InfoPopover
              location={activeLocation}
              onCloseClick={() => handleActivateLocation(null)}
            />
          </GoogleMap>
        ) : (
          <Center background="brand.grey.light" width="full" height="full">
            <Spinner size="xl" />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Map;
