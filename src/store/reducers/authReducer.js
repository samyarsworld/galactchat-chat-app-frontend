import * as actions from "../actionTypes/authType";
import deCodeToken from "jwt-decode";

const authState = {
  authenticate: false,
  userInfo: "",
  error: "",
};

const tokenDecode = (token) => {
  const tokenDecoded = deCodeToken(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

const getToken = localStorage.getItem("authToken");
if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    authState.userInfo = getInfo;
    authState.authenticate = true;
  }
}

export const authReducer = (state = authState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.REGISTER_FAIL:
    case actions.LOGIN_FAIL:
      return {
        ...state,
        error: payload.error,
        authenticate: false,
        userInfo: "",
      };
    case actions.REGISTER_SUCCESS:
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        authenticate: true,
        error: "",
        userInfo: tokenDecode(payload.token),
      };

    case actions.ERROR_CLEAR:
      return {
        ...state,
        error: "",
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticate: false,
        userInfo: "",
      };

    default:
      return state;
  }
};
