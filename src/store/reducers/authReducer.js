import * as actions from "../actionTypes/authType";
import deCodeToken from "jwt-decode";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  currentUserInfo: "",
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
    authState.currentUserInfo = getInfo;
    authState.authenticate = true;
    authState.loading = false;
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
        currentUserInfo: "",
        loading: true,
      };
    case actions.REGISTER_SUCCESS:
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        successMessage: payload.successMessage,
        authenticate: true,
        error: "",
        currentUserInfo: tokenDecode(payload.token),
        loading: false,
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        successMessage: payload.successMessage,
        authenticate: false,
        currentUserInfo: "",
      };

    case actions.ERROR_CLEAR:
      return {
        ...state,
        error: "",
      };
    case actions.SUCCESS_MESSAGE_CLEAR:
      return {
        ...state,
        successMessage: "",
      };

    default:
      return state;
  }
};
