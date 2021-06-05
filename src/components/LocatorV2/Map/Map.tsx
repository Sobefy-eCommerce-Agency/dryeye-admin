import { useEffect } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import useGeolocation from "../../../hooks/useGeolocation";
import { PracticesApi } from "../../../configuration/axiosInstances";
import { useLocator, Action } from "../../context/locatorContext";
import LocatorMarker from "./Marker/Marker";
import { Practice } from "../../../types/interfaces/practices";
import Filter from "./Filter/Filter";
import PlacesAutocomplete from "./PlacesAutocomplete/PlacesAutocomplete";
import MultiSelect from "./MultiSelect/MultiSelect";
import { sortByBooleanProperty } from "../../../utils/utils";
import { FormatCheckBoxData, getUniqueProducts } from "../../../utils/format";
import InfoPopover from "./InfoPopover/InfoPopover";
import { Center as CenterType } from "../../../types/commons/commons";

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
    locations,
    filteredLocations,
    activeLocation,
    dryEyeTreatmentsFilter,
    eyeCareServicesFilter,
    dryEyeProductsFilter,
    practiceNameFilter,
    doctorsFilter,
  } = state;
  const currentLocations = filteredLocations || locations;

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

  const dryEyeProducts = getUniqueProducts(locations);

  // Handlers
  const changeFilter = (action: Action) => {
    dispatch(action);
    dispatch({
      type: "setActiveLocation",
      location: null,
    });
  };

  const selectPlacesAutocomplete = (center: CenterType | null) => {
    if (center) {
      dispatch({
        type: "setCenter",
        center: center,
      });
      dispatch({
        type: "setZoom",
        zoom: 10,
      });
    }
  };

  console.log(window.google.maps.geometry.spherical);

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
      dispatch({
        type: "setCenter",
        center: { lat: location.latitude, lng: location.longitude },
      });
      dispatch({
        type: "setZoom",
        zoom: 10,
      });
    }
  }, [location, dispatch]);

  useEffect(() => {
    let newLocations: Practice[] | null = null;
    const currentLocations = locations;
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
        if (
          treatmentsIncluded ||
          servicesIncluded ||
          practiceNameIncluded ||
          productsIncluded ||
          doctorsIncluded
        ) {
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
    } else {
      dispatch({
        type: "resetFilters",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dryEyeTreatmentsFilter,
    eyeCareServicesFilter,
    dryEyeProductsFilter,
    doctorsFilter,
    practiceNameFilter,
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
          gridTemplateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
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
            {currentLocations
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
