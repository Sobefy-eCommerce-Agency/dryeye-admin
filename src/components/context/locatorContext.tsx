import * as React from "react";
import { Center } from "../../types/commons/commons";
import { Practice } from "../../types/interfaces/practices";

type Action =
  | { type: "setCenter"; center: Center }
  | { type: "setZoom"; zoom: number }
  | { type: "setLocations"; locations: Practice[] };
type Dispatch = (action: Action) => void;
type State = {
  center: Center;
  zoom: number;
  locations: Practice[] | null;
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
