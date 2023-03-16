import * as actions from "../actionTypes/chatType";

const chatState = {
  friends: [],
  messages: [],
};

export const chatReducer = (state = chatState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.FRIEND_GET_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
      };

    case actions.MESSAGE_GET_SUCCESS:
      return {
        ...state,
        messages: payload.messages,
      };
    case actions.MESSAGE_SEND_SUCCESS:
    case actions.SOCKET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload.message],
      };

    default:
      return state;
  }
};
