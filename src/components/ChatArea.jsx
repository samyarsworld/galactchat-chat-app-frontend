import React from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
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
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`./images/${currentFriend.image}`} alt="" />
                  </div>
                  <div className="name">
                    <h3>{currentFriend.username} </h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      <FaRocketchat />
                    </label>
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
          </div>

          <div className="col-4">
            <FriendInfo
              currentFriend={currentFriend}
              onlineFriends={onlineFriends}
              messages={messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
