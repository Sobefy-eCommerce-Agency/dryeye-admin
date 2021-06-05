import { useCallback, useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useLocator, Action } from "../context/locatorContext";
import useGeolocation from "../../hooks/useGeolocation";
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
  const cardWrapperRef: React.LegacyRef<HTMLDivElement> | undefined =
    useRef(null);
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
    noResultsFound,
  } = state;
  const currentLocations = filteredLocations || locations;
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
    PracticesApi.get(undefined, true).then((response) => {
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
      dryEyeProductsFilter ||
      doctorsFilter
    ) {
      const results = currentLocations?.filter((loc) => {
        const currentDryEyeTreatments = loc.dryEyeTreatments;
        const currentEyeCareServices = loc.eyeCareServices;
        const currentPracticeName = loc.name.toLowerCase();
        const currentDryEyeProducts = loc.dryEyeProducts;
        const currentDoctors = loc.doctors;
        const currentDoctor = loc.doctorName;
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
          practiceNameIncluded =
            currentPracticeName.includes(practiceNameFilter);
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
        // Filter Doctor names
        // if (doctorsFilter && currentDoctors && currentDoctors.length > 0) {
        //   const filteredDoctors = currentDoctors.filter((doc) => {
        //     const { firstName, lastName } = doc;
        //     if (firstName && lastName) {
        //       const fullName =
        //         `${firstName.trim()} ${lastName.trim()}`.toLowerCase();
        //       const lowerCaseDoctor = currentDoctor
        //         ? currentDoctor.toLowerCase()
        //         : "";
        //       if (
        //         fullName.includes(doctorsFilter) ||
        //         lowerCaseDoctor.includes(doctorsFilter)
        //       ) {
        //         return true;
        //       }
        //     }
        //     return false;
        //   });
        //   if (filteredDoctors.length > 0) {
        //     doctorsIncluded = true;
        //   } else {
        //     doctorsIncluded = false;
        //   }
        // }

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

  const activeCardRef = useCallback((node: HTMLDivElement) => {
    if (node !== null && cardWrapperRef.current !== null) {
      cardWrapperRef.current.scrollTop = node.offsetTop;
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
    <Flex
      width="full"
      height={{ base: "auto", md: "100vh" }}
      direction="column"
      background="gray.50"
    >
      <SimpleGrid
        px={5}
        py={6}
        columns={{ base: 1, md: 2, lg: 6 }}
        rowGap={{ base: 4, md: 4, lg: 0 }}
        columnGap={5}
      >
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
        {/* <NameFilter
          id="doctors_filter"
          placeholder="Doctor name"
          label="Doctor Name"
          value={doctorsFilter}
          onChange={(e) => {
            dispatch({
              type: "setDoctorsFilter",
              name: e.target.value.toLowerCase(),
            });
          }}
        /> */}
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
          placeholder="Treatments"
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
          placeholder="Services"
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
      </SimpleGrid>
      <SimpleGrid
        height="full"
        templateColumns={{ base: "100%", md: "50% 50%", lg: "26% 74%" }}
        templateRows={{ base: "500px 1fr", md: "1fr" }}
        overflowY="hidden"
        py={5}
        pt={{ base: 0, md: 5 }}
        px={{ base: 5, md: 0 }}
      >
        <Box
          display="grid"
          gridTemplateColumns="1fr"
          gridRowGap={5}
          overflowY="auto"
          height="100%"
          order={{ base: 2, md: 1 }}
          ref={cardWrapperRef}
          position="relative"
          __css={{ scrollBehavior: "smooth" }}
        >
          {getLocationsList()}
        </Box>
        <Box
          mr={{ base: 0, md: 5 }}
          mb={{ base: 5, md: 0 }}
          boxShadow="sm"
          order={{ base: 1, md: 2 }}
        >
          {!loading ? (
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
