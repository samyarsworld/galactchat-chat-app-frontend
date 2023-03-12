import React from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Message from "./Message";
import SendMessage from "./SendMessage";
import FriendInfo from "./FriendInfo";

const MessageArea = () => {
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
                    <img src={`./images/`} alt="" />
                  </div>
                  <div className="name">
                    <h3> sam </h3>
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
              <Message />
              <SendMessage />
            </div>
          </div>

          <div className="col-4">
            User About Page
            <FriendInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
