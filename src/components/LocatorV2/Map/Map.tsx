import { useEffect } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { googleApiKey } from "../../../shared/environment";
import useGeolocation from "../../../hooks/useGeolocation";
import { PracticesApi } from "../../../configuration/axiosInstances";
import { useLocator, Action } from "../../context/locatorContext";
import LocatorMarker from "./Marker/Marker";
import { Practice } from "../../../types/interfaces/practices";
import Filter from "./Filter/Filter";
import PlacesAutocomplete from "./PlacesAutocomplete/PlacesAutocomplete";
import MultiSelect from "./MultiSelect/MultiSelect";
import {
  dryEyeProducts,
  dryEyeTreatments,
  eyeCareServices,
} from "../../../shared/consts";
import { sortByBooleanProperty } from "../../../utils/utils";

interface MapProps {
  handleActivateLocation(location: Practice | null): void;
}

const Map = ({ handleActivateLocation }: MapProps) => {
  const { state, dispatch } = useLocator();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
  });
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
    noResultsFound,
  } = state;
  const currentLocations = filteredLocations || locations;

  // Handlers
  const handleTextFilterChange = (
    value: string,
    type: "practiceName" | "doctorName"
  ) => {
    if (value !== "") {
      const filteredLocations = currentLocations?.filter((loc) => {
        const formatedValue = value.toLowerCase().trim();
        const { doctors, name } = loc;
        let includePracticeName = false;
        let includeDoctorName = false;

        if (type === "practiceName") {
          const lowerCaseLocationName = name.toLowerCase().trim();
          const practiceNameIncluded =
            lowerCaseLocationName.includes(formatedValue);
          includePracticeName = practiceNameIncluded;
        }

        if (type === "doctorName") {
          if (doctors && doctors.length > 0) {
            const filteredDoctors = doctors.filter((doc) => {
              const { firstName, lastName } = doc;
              if (firstName && lastName) {
                const fullName =
                  `${firstName.trim()} ${lastName.trim()}`.toLowerCase();
                if (fullName.includes(formatedValue)) {
                  return true;
                }
              }
              return false;
            });
            includeDoctorName = filteredDoctors.length > 0;
          }
        }

        if (includePracticeName && includeDoctorName) {
          return true;
        }
        return false;
      });
      const newLocations =
        filteredLocations && filteredLocations.length > 0
          ? filteredLocations
          : null;
      dispatch({
        type: "setNoResultsFound",
        noResultsFound: newLocations && newLocations.length > 0 ? false : true,
      });
      dispatch({
        type: "setFilteredLocations",
        locations: newLocations,
      });
    } else {
      dispatch({
        type: "setNoResultsFound",
        noResultsFound: false,
      });
      dispatch({
        type: "setFilteredLocations",
        locations: null,
      });
    }
  };

  const changeFilter = (action: Action) => {
    dispatch(action);
    dispatch({
      type: "setActiveLocation",
      location: null,
    });
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
        if (doctorsFilter && currentDoctors && currentDoctors.length > 0) {
          const filteredDoctors = currentDoctors.filter((doc) => {
            const { firstName, lastName } = doc;
            if (firstName && lastName) {
              const fullName =
                `${firstName.trim()} ${lastName.trim()}`.toLowerCase();
              const lowerCaseDoctor = currentDoctor
                ? currentDoctor.toLowerCase()
                : "";
              if (
                fullName.includes(doctorsFilter) ||
                lowerCaseDoctor.includes(doctorsFilter)
              ) {
                return true;
              }
            }
            return false;
          });
          console.log(filteredDoctors);
          if (filteredDoctors.length > 0) {
            doctorsIncluded = true;
          } else {
            doctorsIncluded = false;
          }
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
          position="absolute"
          top={4}
          zIndex={999}
          p={30}
          borderRadius={6}
          boxShadow="xl"
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          gridColumnGap={2}
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
          <Filter
            placeholder="Doctor Name"
            type="text"
            value={doctorsFilter}
            onChange={(value) =>
              dispatch({
                type: "setDoctorsFilter",
                name: value,
              })
            }
          />
          <PlacesAutocomplete
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
        {isLoaded && !loading && currentLocations ? (
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
