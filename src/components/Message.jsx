import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCheckmarkSharp, IoCheckmarkDoneSharp } from "react-icons/io5";

const Message = ({ messages, currentFriend, scrollRef, typingMessage }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="message-box">
        {messages && messages.length > 0 ? (
          messages.map((message, index) =>
            message.senderId === userInfo.id ? (
              <div className="user-message" ref={scrollRef} key={message._id}>
                <div className="image-message">
                  <div className="user-text">
                    <p className="message-text">
                      {message.message.text === "" ? (
                        <img
                          src={`./images/${message.message.image}`}
                          alt="..."
                        />
                      ) : (
                        message.message.text
                      )}
                    </p>
                    {index === messages.length - 1 &&
                    message.senderId === userInfo.id ? (
                      message.status === "seen" ? (
                        <img
                          className="img"
                          src={`./images/${currentFriend.image}`}
                          alt=""
                        />
                      ) : message.status === "delivered" ? (
                        <span>
                          <IoCheckmarkDoneSharp />
                        </span>
                      ) : (
                        <span>
                          <IoCheckmarkSharp />
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="time">
                  {moment(message.createdAt).startOf("mini").fromNow()}
                </div>
              </div>
            ) : (
              <div className="fd-message" ref={scrollRef} key={message._id}>
                <div className="image-message">
                  <img src={`./images/${currentFriend.image}`} alt="..." />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">
                        {message.message.text === "" ? (
                          <img
                            src={`./images/${message.message.image}`}
                            alt="..."
                          />
                        ) : (
                          message.message.text
                        )}
                      </p>
                    </div>
                    <div className="time">
                      {moment(message.createdAt).startOf("mini").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend-connect">
            <img src={`./images/${currentFriend.image}`} alt="" />
            <h3>{currentFriend.username} Connect You </h3>
            <span>
              {moment(currentFriend.createdAt).startOf("mini").fromNow()}
            </span>
          </div>
        )}
      </div>
      {typingMessage &&
      typingMessage.message &&
      typingMessage.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={`./images/${currentFriend.image}`} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time">Typing... </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
