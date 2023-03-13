import axios from "axios";
import { FRIEND_GET_SUCCESS } from "../actionTypes/chatType";

export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/chat/get-friends");
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/chat/send-message", data);
  } catch (error) {}
};

export const messageGet = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/chat/get-message/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};
