import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      console.log("auth reducer", action.payload);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const check = async () => await sdk.check(localStorage.getItem("role"));

    const value = check().then((data) => {
      if (data == false) {
        tokenExpireError(dispatch, "Login failed");
      } else {
        dispatch({
          type: "LOGIN",
          payload: {
            ...state,
            isAuthenticated: true,
            user: localStorage.getItem("user"),
            token: localStorage.getItem("token"),
            role: localStorage.getItem("role"),
          },
        });
      }
    });

    console.log("value", value);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
