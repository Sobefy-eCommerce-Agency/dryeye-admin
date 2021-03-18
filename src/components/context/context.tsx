import { useContext, createContext, useReducer } from "react";

type Action =
  | { type: "authenticate"; value: boolean }
  | { type: "loading"; value: boolean }
  | { type: "isAuthenticating"; value: boolean };

type State = {
  authenticated: boolean;
  loading: boolean;
  isAuthenticating: boolean;
};
type Dispatch = (action: Action) => void;
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "authenticate": {
      return { ...state, authenticated: action.value };
    }
    case "loading": {
      return { ...state, loading: action.value };
    }
    case "isAuthenticating": {
      return { ...state, isAuthenticating: action.value };
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    loading: false,
    isAuthenticating: true,
  });
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
