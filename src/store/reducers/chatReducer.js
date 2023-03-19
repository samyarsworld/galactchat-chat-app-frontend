import * as actions from "../actionTypes/chatType";

const chatState = {
  friends: [],
  messages: [],
  messageSuccess: false,
  message_seen_success: false,
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
        message_get_success: true,
        messages: payload.messages,
      };

    case actions.MESSAGE_GET_SUCCESS_CLEAR:
      return {
        ...state,
        message_get_success: false,
      };

    case actions.MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        messageSuccess: true,
        messages: [...state.messages, payload.message],
      };
    case actions.SOCKET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload.message],
      };

    case actions.UPDATE_LAST_MESSAGE:
      const index_u = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );
      state.friends[index_u].lastMessageInfo = payload.messageInfo;
      state.friends[index_u].lastMessageInfo.status = payload.status;

      return state;

    case actions.MESSAGE_SEND_SUCCESS_CLEAR:
      return {
        ...state,
        messageSuccess: false,
      };

    case actions.DELIVERED_MESSAGE:
      const index_d = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );
      state.friends[index_d].lastMessageInfo.status = "delivered";
      return {
        ...state,
      };

    case actions.SEEN_MESSAGE:
      const index_s = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );
      state.friends[index_s].lastMessageInfo.status = "seen";
      return {
        ...state,
      };

    case actions.UPDATE_SEEN:
      const index = state.friends.findIndex(
        (friend) => friend.friendInfo._id === payload.id
      );
      if (state.friends[index].lastMessageInfo) {
        state.friends[index].lastMessageInfo.status = "seen";
      }
      return {
        ...state,
      };

    case actions.SEEN_ALL:
      const index_sa = state.friends.findIndex(
        (friend) => friend.friendInfo._id === payload.receiverId
      );
      state.friends[index_sa].lastMessageInfo.status = "seen";
      return {
        ...state,
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        friends: [],
        messages: [],
        messageSuccess: false,
        message_seen_success: false,
      };

    default:
      return state;
  }
};
