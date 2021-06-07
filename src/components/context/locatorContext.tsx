import * as React from "react";
import { Center } from "../../types/commons/commons";
import { Practice } from "../../types/interfaces/practices";

export type Action =
  | { type: "setCenter"; center: Center }
  | { type: "setZoom"; zoom: number }
  | { type: "setLocations"; locations: Practice[] }
  | { type: "setFilteredLocations"; locations: Practice[] | null }
  | { type: "setGeoFilteredLocations"; locations: Practice[] | null }
  | { type: "setActiveLocation"; location: Practice | null }
  | { type: "setDryEyeTreatmentsFilter"; filters: any[] | null }
  | { type: "setEyeCareServicesFilter"; filters: any[] | null }
  | { type: "setDryEyeProductsFilter"; filters: any[] | null }
  | { type: "setDoctorsFilter"; filters: any[] | null }
  | { type: "setPracticeNameFilter"; name: string }
  | { type: "setNoResultsFound"; noResultsFound: boolean }
  | { type: "resetFilters" }
  | { type: "scrollLocation"; scroll: boolean }
  | { type: "setSearchRadius"; radius: string };
type Dispatch = (action: Action) => void;
type State = {
  center: Center;
  zoom: number;
  locations: Practice[] | null;
  filteredLocations: { active: boolean; locations: Practice[] | null };
  geoFilteredLocations: { active: boolean; locations: Practice[] | null };
  activeLocation: Practice | null;
  dryEyeTreatmentsFilter: any[] | null;
  eyeCareServicesFilter: any[] | null;
  dryEyeProductsFilter: any[] | null;
  practiceNameFilter: string;
  doctorsFilter: any[] | null;
  noResultsFound: boolean;
  scrolling: boolean;
  searchRadius: string;
};
type CountProviderProps = { children: React.ReactNode };

const LocatorStateContext =
  React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
    undefined
  );

function locatorReducer(state: State, action: Action) {
  switch (action.type) {
    case "setCenter": {
      return { ...state, center: action.center };
    }
    case "setZoom": {
      return { ...state, zoom: action.zoom };
    }
    case "setLocations": {
      return { ...state, locations: action.locations };
    }
    case "setFilteredLocations": {
      return {
        ...state,
        filteredLocations: {
          ...state.filteredLocations,
          locations: action.locations,
          active: true,
        },
        geoFilteredLocations: {
          ...state.geoFilteredLocations,
          active: false,
        },
      };
    }
    case "setGeoFilteredLocations": {
      return {
        ...state,
        geoFilteredLocations: {
          ...state.geoFilteredLocations,
          locations: action.locations,
          active: true,
        },
        filteredLocations: {
          ...state.filteredLocations,
          active: false,
        },
      };
    }
    case "setActiveLocation": {
      return { ...state, activeLocation: action.location };
    }
    case "setDryEyeTreatmentsFilter": {
      return { ...state, dryEyeTreatmentsFilter: action.filters };
    }
    case "setEyeCareServicesFilter": {
      return { ...state, eyeCareServicesFilter: action.filters };
    }
    case "setDryEyeProductsFilter": {
      return { ...state, dryEyeProductsFilter: action.filters };
    }
    case "setPracticeNameFilter": {
      return { ...state, practiceNameFilter: action.name };
    }
    case "setDoctorsFilter": {
      return { ...state, doctorsFilter: action.filters };
    }
    case "setNoResultsFound": {
      return { ...state, noResultsFound: action.noResultsFound };
    }
    case "resetFilters": {
      return {
        ...state,
        dryEyeTreatmentsFilter: null,
        eyeCareServicesFilter: null,
        practiceNameFilter: "",
        filteredLocations: { active: false, locations: null },
        geoFilteredLocations: { active: false, locations: null },
        doctorsFilter: null,
        noResultsFound: false,
      };
    }
    case "scrollLocation": {
      return {
        ...state,
        scrolling: action.scroll,
      };
    }
    case "setSearchRadius": {
      return {
        ...state,
        searchRadius: action.radius,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function LocatorProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(locatorReducer, {
    center: { lat: 37.09024, lng: -95.712891 },
    zoom: 4,
    locations: null,
    filteredLocations: { active: false, locations: null },
    geoFilteredLocations: { active: false, locations: null },
    activeLocation: null,
    dryEyeTreatmentsFilter: null,
    eyeCareServicesFilter: null,
    dryEyeProductsFilter: null,
    doctorsFilter: null,
    practiceNameFilter: "",
    noResultsFound: false,
    scrolling: false,
    searchRadius: "200",
  });

  const value = { state, dispatch };
  return (
    <LocatorStateContext.Provider value={value}>
      {children}
    </LocatorStateContext.Provider>
  );
}

function useLocator() {
  const context = React.useContext(LocatorStateContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { LocatorProvider, useLocator };
