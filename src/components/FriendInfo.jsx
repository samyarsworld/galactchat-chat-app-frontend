import React, { useState } from "react";
import { FaCaretSquareDown } from "react-icons/fa";

const FriendInfo = ({ currentFriend, onlineFriends, messages }) => {
  const [media, setMedia] = useState(false);

  return (
    <div className="friend-info">
      <div className="image-name">
        <div className="image">
          <img src={currentFriend.image} alt="" />
        </div>
        <div className="active-user">
          {onlineFriends &&
          onlineFriends.length > 0 &&
          onlineFriends.some((user) => user.id === currentFriend._id) ? (
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
        <div className="media" onClick={() => setMedia((prev) => !prev)}>
          Shared Media
          <FaCaretSquareDown />
        </div>
      </div>

      {media && (
        <div className="gallery">
          {messages && messages.length > 0
            ? messages.map(
                (message, index) =>
                  message.message.image && (
                    <img key={index} src={message.message.image} />
                  )
              )
            : ""}
        </div>
      )}
    </div>
  );
};

export default FriendInfo;
