import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import FriendInfo from "./FriendInfo";

const MessageArea = ({
  currentFriend,
  newMessage,
  newMessageHandler,
  sendMessage,
  messages,
  scrollRef,
  sendEmoji,
  sendImage,
  onlineFriends,
  typingMessage,
}) => {
  return (
    <div className="row">
      <div className="chat">
        <div className="header">
          <div className="image-name">
            <div className="image">
              <img src={currentFriend.image} alt="" />
              {onlineFriends &&
              onlineFriends.length > 0 &&
              onlineFriends.some((user) => user.id === currentFriend._id) ? (
                <div className="active-icon"></div>
              ) : (
                ""
              )}
            </div>
            <div className="name">
              <h3>{currentFriend.username} </h3>
            </div>
          </div>
        </div>
        <Message
          messages={messages}
          currentFriend={currentFriend}
          scrollRef={scrollRef}
          typingMessage={typingMessage}
        />
        <SendMessage
          newMessage={newMessage}
          newMessageHandler={newMessageHandler}
          sendMessage={sendMessage}
          sendEmoji={sendEmoji}
          sendImage={sendImage}
        />
      </div>

      <div className="info">
        <FriendInfo
          currentFriend={currentFriend}
          onlineFriends={onlineFriends}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default MessageArea;
