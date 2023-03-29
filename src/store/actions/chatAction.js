import axios from "axios";
import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from "../actionTypes/chatType";

const URL = "https://galactchat.onrender.com";
// const URL = "http://localhost:5000";

export const getFriends = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/api/chat/get-friends`, data);
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: { friends: response.data.friends },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/api/chat/send-message`, data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageGet = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/api/chat/get-message`, data);
    dispatch({
      type: MESSAGE_GET_SUCCESS,
      payload: { messages: response.data.messages },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const sendImageMessage = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${URL}/api/chat/send-image-message`,
      data,
      config
    );
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const seenMessage = (message) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/api/chat/seen-message`, message);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = (message) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${URL}/api/chat/delivered-message`,
      message
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};
