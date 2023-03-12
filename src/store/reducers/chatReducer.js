import * as actions from "../actionTypes/chatType";

const chatState = {
  friends: [],
};

export const chatReducer = (state = chatState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.FRIEND_GET_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
      };

    default:
      return state;
  }
};
