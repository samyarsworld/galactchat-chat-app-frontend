import axios from "axios";
import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from "../actionTypes/chatType";

export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/chat/get-friends");
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
    const response = await axios.post("/api/chat/send-message", data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageGet = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/chat/get-message/${id}`);

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
    const response = await axios.post("/api/chat/send-image-message", data);
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
    const response = await axios.post("/api/chat/seen-message", message);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = (message) => async (dispatch) => {
  try {
    const response = await axios.post("/api/chat/delivered-message", message);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};
