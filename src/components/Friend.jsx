import React from "react";
import moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";

const Friend = ({ friend, userInfo, onlineFriends }) => {
  const { friendInfo, lastMessageInfo } = friend;
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${friendInfo.image}`} alt="" />
          {onlineFriends &&
          onlineFriends.length > 0 &&
          onlineFriends.some(
            (onlineFriend) => onlineFriend.id === friendInfo._id
          ) ? (
            <div className="active_icon"></div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4
            className={
              lastMessageInfo?.senderId !== userInfo.id &&
              lastMessageInfo?.status !== undefined &&
              lastMessageInfo.status !== "seen"
                ? "unseen_message Fd_name "
                : "Fd_name"
            }
          >
            {friendInfo.username}
          </h4>
          <div className="msg-time">
            {lastMessageInfo && lastMessageInfo.senderId === userInfo.id ? (
              <small>You: </small>
            ) : (
              <small
                className={
                  lastMessageInfo?.senderId !== userInfo.id &&
                  lastMessageInfo?.status !== undefined &&
                  lastMessageInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                {friendInfo.username + ": "}
              </small>
            )}
            {lastMessageInfo && lastMessageInfo.message.text ? (
              <small
                className={
                  lastMessageInfo?.senderId !== userInfo.id &&
                  lastMessageInfo?.status !== undefined &&
                  lastMessageInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                {lastMessageInfo.message.text.slice(0, 10)}
              </small>
            ) : lastMessageInfo && lastMessageInfo.message.image ? (
              <small>Send A image </small>
            ) : (
              <small>Connect You </small>
            )}
            <small>
              {lastMessageInfo
                ? moment(lastMessageInfo.createdAt).startOf("mini").fromNow()
                : moment(friendInfo.createdAt).startOf("mini").fromNow()}
            </small>
          </div>
        </div>
        {userInfo.id === lastMessageInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {lastMessageInfo.status === "seen" ? (
              <img src={`./images/${friendInfo.image}`} alt="" />
            ) : lastMessageInfo.status === "delivered" ? (
              <div className="delivered">
                <FaRegCheckCircle />
              </div>
            ) : (
              <div className="unseen"> </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {lastMessageInfo?.status !== undefined &&
            lastMessageInfo?.status !== "seen" ? (
              <div className="seen-icon"> </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
