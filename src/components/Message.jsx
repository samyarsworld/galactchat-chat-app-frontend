import React from "react";
import { useSelector } from "react-redux";

const Message = ({ messages, currentFriend, scrollRef, typingMessage }) => {
  const { currentUserInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="message-show">
        {messages && messages.length > 0
          ? messages.map((m) =>
              m.senderId === currentUserInfo.id ? (
                <div className="my-message" ref={scrollRef} key={m._id}>
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">
                        {m.message.text === "" ? (
                          <img src={`./images/${m.message.image}`} alt="..." />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="time">{m.createdAt}</div>
                </div>
              ) : (
                <div className="fd-message" ref={scrollRef} key={m._id}>
                  <div className="image-message-time">
                    <img src={`./images/${currentFriend.image}`} alt="..." />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text">
                          {m.message.text === "" ? (
                            <img
                              src={`./images/${m.message.image}`}
                              alt="..."
                            />
                          ) : (
                            m.message.text
                          )}
                        </p>
                      </div>
                      <div className="time">{m.createdAt}</div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
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
