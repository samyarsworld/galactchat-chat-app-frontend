import React from "react";
import { FaCaretSquareDown, FaEdit, FaSistrix } from "react-icons/fa";

const FriendInfo = ({ currentFriend, onlineFriends, messages }) => {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={`./images/${currentFriend.image}`} alt="" />
        </div>
        <div className="active-user">
          {onlineFriends &&
          onlineFriends.length > 0 &&
          onlineFriends.some((user) => user.userId === currentFriend._id) ? (
            <div className="active-icon">Active</div>
          ) : (
            ""
          )}
        </div>

        <div className="name">
          <h4>{currentFriend.username}</h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>customize Chat </h3>
          <FaEdit />
        </div>

        <div className="privacy">
          <h3>Privacy and Support </h3>
          <FaCaretSquareDown />
        </div>

        <div className="media">
          <h3>Shared Media </h3>
          <label htmlFor="gallery">
            <FaSistrix />
          </label>
        </div>
      </div>

      <div className="gallery">
        {messages && messages.length > 0
          ? messages.map(
              (message, index) =>
                message.message.image && (
                  <img key={index} src={`./images/${message.message.image}`} />
                )
            )
          : ""}
      </div>
    </div>
  );
};

export default FriendInfo;
