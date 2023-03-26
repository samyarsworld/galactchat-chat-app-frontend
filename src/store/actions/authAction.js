import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "../actionTypes/authType";

const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "/api/chat/user-register",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

const userLogin = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("/api/chat/user-login", data, config);
    localStorage.setItem("authToken", response.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: response.data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        error: error.response.data.error.errorMessage,
      },
    });
  }
};

const userLogout = () => async (dispatch) => {
  try {
    const response = await axios.post("/api/chat/user-logout");
    if (response.data.successMessage) {
      localStorage.removeItem("authToken");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export { userRegister, userLogin, userLogout };
