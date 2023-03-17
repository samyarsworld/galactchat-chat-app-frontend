import React from "react";
// import moment from "moment";

const Friends = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${friend.friendInfo.image}`} alt="" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{friend.friendInfo.username}</h4>
          <small style={{ color: "grey" }}>
            {friend.lastMessage.slice(0, 10)}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Friends;
