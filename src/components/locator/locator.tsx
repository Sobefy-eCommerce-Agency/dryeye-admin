import { useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useLocator, Action } from "../context/locatorContext";
import useGeolocation from "../../hooks/useGeolocation";
import { googleApiKey } from "../../shared/environment";
import { PracticesApi } from "../../configuration/axiosInstances";
import LocatorMarker from "./locatorMarker";
import { Practice } from "../../types/interfaces/practices";
import LocatorInfoWindow from "./locatorInfoWindow";
import LocatorCard from "./locatorCard";
import { dryEyeTreatments, eyeCareServices } from "../../shared/consts";
import MultiSelect from "../multiSelect/multiSelect";
import SkeletonCard from "../skeleton/skeletonCard";
import PlacesAutocomplete from "./placesAutocomplete";
import NameFilter from "./filters/nameFilter";
import { getUniqueProducts } from "../../utils/format";

const Locator = () => {
  const { state, dispatch } = useLocator();
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
    noResultsFound,
  } = state;
  const currentLocations = filteredLocations || locations;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
  });
  const [loading, location] = useGeolocation();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
  };

  // Computed values
  const dryEyeProducts = getUniqueProducts(locations);

  // Handlers
  const activateLocation = (location: Practice | null) => {
    if (
      location &&
      typeof location.latitude === "number" &&
      typeof location.longitude === "number"
    ) {
      dispatch({
        type: "setCenter",
        center: { lat: location.latitude, lng: location.longitude },
      });
      dispatch({
        type: "setZoom",
        zoom: 15,
      });
    }
    dispatch({
      type: "setActiveLocation",
      location: location,
    });
  };

  const changeFilter = (action: Action) => {
    dispatch(action);
    dispatch({
      type: "setActiveLocation",
      location: null,
    });
  };

  const resetFilters = () => {
    dispatch({
      type: "resetFilters",
    });
  };

  // Side effects
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
    PracticesApi.get().then((response) => {
      const { data } = response;
      if (data) {
        dispatch({
          type: "setLocations",
          locations: data,
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    let newLocations: Practice[] | null = null;
    const currentLocations = locations;
    if (
      dryEyeTreatmentsFilter ||
      eyeCareServicesFilter ||
      practiceNameFilter ||
      dryEyeProductsFilter
    ) {
      const results = currentLocations?.filter((loc) => {
        const currentDryEyeTreatments = loc.dryEyeTreatments;
        const currentEyeCareServices = loc.eyeCareServices;
        const currentPracticeName = loc.name.toLowerCase();
        const currentDryEyeProducts = loc.dryEyeProducts;
        let treatmentsIncluded = false;
        let servicesIncluded = false;
        let practiceNameIncluded = false;
        let productsIncluded = false;
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
        // Filter by practice nam
        if (practiceNameFilter) {
          practiceNameIncluded = currentPracticeName.includes(
            practiceNameFilter
          );
        }
        // Filter by Dry Eye Products
        if (
          dryEyeProductsFilter &&
          dryEyeProductsFilter.length > 0 &&
          currentDryEyeProducts
        ) {
          dryEyeProductsFilter?.forEach((filter) => {
            productsIncluded = currentDryEyeProducts.includes(filter.value);
          });
        }

        // Check results
        if (
          treatmentsIncluded ||
          servicesIncluded ||
          practiceNameIncluded ||
          productsIncluded
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
    practiceNameFilter,
  ]);

  const activeCardRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // JSX
  const getLocationsList = () => {
    if (noResultsFound) {
      return (
        <Flex
          px={5}
          py={6}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          direction="column"
        >
          <Text mb={6}>No locations found.</Text>
          <Button
            onClick={resetFilters}
            background="brand.secondary"
            color="white"
          >
            Reset filters
          </Button>
        </Flex>
      );
    }
    if (currentLocations) {
      const currentLocationsList = currentLocations.map((loc) => {
        const isActive = activeLocation?.practice === loc.practice;
        const currentRef = isActive ? activeCardRef : null;
        return (
          <LocatorCard
            reference={currentRef}
            key={loc.practice}
            location={loc}
            isActive={isActive}
            onClick={(location) => activateLocation(location)}
          />
        );
      });
      return currentLocationsList;
    }
    return [...Array(20)].map((_, i) => <SkeletonCard key={i} />);
  };

  return (
    <Flex width="full" height="100vh" direction="column" background="gray.50">
      <SimpleGrid px={5} py={6} columns={5} columnGap={5}>
        <NameFilter
          id="practice_name_filter"
          placeholder="Practice name"
          label="Practice Name"
          value={practiceNameFilter}
          onChange={(e) => {
            dispatch({
              type: "setPracticeNameFilter",
              name: e.target.value.toLowerCase(),
            });
          }}
        />
        <PlacesAutocomplete
          label="Location"
          id="location_filter"
          placeholder="Location"
          onSelect={(center) => {
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
          }}
        />
        <MultiSelect
          id="dry_eye_treatments_select"
          label="DryEye Treatments"
          name="DryEye Treatments"
          placeholder="Select one or multiple treatments"
          options={dryEyeTreatments}
          value={dryEyeTreatmentsFilter}
          onSelect={(values: any[]) =>
            changeFilter({
              type: "setDryEyeTreatmentsFilter",
              filters: values && values.length > 0 ? values : null,
            })
          }
        />
        <MultiSelect
          id="eye_care_services_select"
          label="Eye Care Services"
          name="Eye Care Services"
          placeholder="Select one or multiple services"
          options={eyeCareServices}
          value={eyeCareServicesFilter}
          onSelect={(values: any[]) =>
            changeFilter({
              type: "setEyeCareServicesFilter",
              filters: values && values.length > 0 ? values : null,
            })
          }
        />
        <MultiSelect
          id="dry_eye_products"
          label="Dry Eye Products"
          name="Dry Eye Products"
          placeholder="Select one or multiple products"
          options={dryEyeProducts}
          value={dryEyeProductsFilter}
          onSelect={(values: any[]) =>
            changeFilter({
              type: "setDryEyeProductsFilter",
              filters: values && values.length > 0 ? values : null,
            })
          }
        />
      </SimpleGrid>
      <SimpleGrid
        height="full"
        templateColumns="27% 73%"
        overflowY="hidden"
        py={5}
      >
        <SimpleGrid columns={1} rowGap={5} overflowY="auto" height="100%">
          {getLocationsList()}
        </SimpleGrid>
        <Box mr={5} boxShadow="sm">
          {isLoaded && !loading ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              options={mapOptions}
            >
              {currentLocations
                ? currentLocations.map((loc) => (
                    <LocatorMarker
                      key={loc.practice}
                      location={loc}
                      onMarkerClick={(location: Practice) =>
                        activateLocation(location)
                      }
                    />
                  ))
                : null}
              <LocatorInfoWindow
                location={activeLocation}
                onCloseClick={() => activateLocation(null)}
              />
            </GoogleMap>
          ) : null}
        </Box>
      </SimpleGrid>
    </Flex>
  );
};

export default Locator;
