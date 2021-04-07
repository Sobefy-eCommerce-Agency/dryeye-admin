import * as React from "react";
import { Center } from "../../types/commons/commons";
import { Practice } from "../../types/interfaces/practices";

type Action =
  | { type: "setCenter"; center: Center }
  | { type: "setZoom"; zoom: number }
  | { type: "setLocations"; locations: Practice[] }
  | { type: "setFilteredLocations"; locations: Practice[] | null }
  | { type: "setActiveLocation"; location: Practice | null }
  | { type: "setDryEyeTreatmentsFilter"; filters: any[] | null }
  | { type: "setEyeCareServicesFilter"; filters: any[] | null }
  | { type: "setNoResultsFound"; noResultsFound: boolean }
  | { type: "resetFilters" };
type Dispatch = (action: Action) => void;
type State = {
  center: Center;
  zoom: number;
  locations: Practice[] | null;
  filteredLocations: Practice[] | null;
  activeLocation: Practice | null;
  dryEyeTreatmentsFilter: any[] | null;
  eyeCareServicesFilter: any[] | null;
  noResultsFound: boolean;
};
type CountProviderProps = { children: React.ReactNode };

const LocatorStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

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
      return { ...state, filteredLocations: action.locations };
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
    case "setNoResultsFound": {
      return { ...state, noResultsFound: action.noResultsFound };
    }
    case "resetFilters": {
      return {
        ...state,
        dryEyeTreatmentsFilter: null,
        eyeCareServicesFilter: null,
        filteredLocations: null,
        noResultsFound: false,
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
    zoom: 3,
    locations: null,
    filteredLocations: null,
    activeLocation: null,
    dryEyeTreatmentsFilter: null,
    eyeCareServicesFilter: null,
    noResultsFound: false,
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
