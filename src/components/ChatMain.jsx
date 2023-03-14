import React, { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import ChatArea from "./ChatArea";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  messageSend,
  messageGet,
  sendImageMessage,
} from "../store/actions/chatAction";

const ChatMain = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();
  const dispatch = useDispatch();

  const { friends, messages } = useSelector((state) => state.chat);
  const { currentUserInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: currentUserInfo.username,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "no message",
    };

    dispatch(messageSend(data));

    setNewMessage("");
  };

  useEffect(() => {
    if (friends && friends.length > 0) setCurrentFriend(friends[0]);
  }, [friends]);

  useEffect(() => {
    dispatch(messageGet(currentFriend._id));
  }, [currentFriend?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendEmoji = (e) => {
    setNewMessage(`${newMessage}` + e);
  };
  const sendImage = (e) => {
    if (e.target.files.length !== 0) {
      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + imageName;

      const formData = new FormData();

      formData.append("senderName", currentUserInfo.username);
      formData.append("imageName", newImageName);
      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(sendImageMessage(formData));
    }
  };

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./images/${currentUserInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{currentUserInfo.username} </h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>

            <div className="active-friends">
              <ActiveFriend />
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      className={
                        currentFriend._id === fd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      key={fd._id}
                      onClick={() => setCurrentFriend(fd)}
                    >
                      <Friends friend={fd} key={fd._id} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        <ChatArea
          currentFriend={currentFriend}
          newMessage={newMessage}
          newMessageHandler={newMessageHandler}
          sendMessage={sendMessage}
          messages={messages}
          scrollRef={scrollRef}
          sendEmoji={sendEmoji}
          sendImage={sendImage}
        />
      </div>
    </div>
  );
};

export default ChatMain;
