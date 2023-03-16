import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

import useSound from "use-sound";
import notificationSound from "../../public/audio/notification.mp3";
import sendingSound from "../../public/audio/sending.mp3";

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
  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");

  const { friends, messages } = useSelector((state) => state.chat);
  const { currentUserInfo, authenticate } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();
  const navigate = useNavigate();

  const [notifySound] = useSound(notificationSound);
  const [sendSound] = useSound(sendingSound);

  // Socket setup
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });
    socket.current.on("getTypingMessage", (data) => {
      setTypingMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", currentUserInfo.id, currentUserInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter(
        (user) => user.userId !== currentUserInfo.id
      );
      setActiveUser(filterUser);
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === currentUserInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend._id &&
      socketMessage.receiverId === currentUserInfo.id
    ) {
      toast.success(`New message from ${socketMessage.senderName}`);
    }
  }, [socketMessage]);

  // Showing friends
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  useEffect(() => {
    if (friends && friends.length > 0) setCurrentFriend(friends[0]);
  }, [friends]);

  // Getting the previous messages between the current friend
  useEffect(() => {
    dispatch(messageGet(currentFriend._id));
  }, [currentFriend?._id]);

  // Show new messages on the screen
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setting input message in the state
  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("typingMessage", {
      senderId: currentUserInfo.id,
      receiverId: currentFriend._id,
      message: e.target.value,
    });
  };

  // Sending message to database
  const sendMessage = (e) => {
    e.preventDefault();
    sendSound();
    if (newMessage) {
      const data = {
        senderName: currentUserInfo.username,
        receiverId: currentFriend._id,
        message: newMessage,
      };

      socket.current.emit("sendMessage", {
        ...data,
        senderId: currentUserInfo.id,
        time: new Date(),
        message: {
          text: newMessage,
          image: "",
        },
      });

      socket.current.emit("typingMessage", {
        senderId: currentUserInfo.id,
        receiverId: currentFriend._id,
        message: "",
      });

      dispatch(messageSend(data));
      setNewMessage("");
    }
  };

  // Add emoji to message
  const sendEmoji = (e) => {
    setNewMessage(`${newMessage}` + e);
    socket.current.emit("typingMessage", {
      senderId: currentUserInfo.id,
      receiverId: currentFriend._id,
      message: e,
    });
  };

  // Add image as message
  const sendImage = (e) => {
    if (e.target.files.length !== 0) {
      sendSound();

      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + imageName;

      socket.current.emit("sendMessage", {
        senderId: currentUserInfo.id,
        senderName: currentUserInfo.username,
        receiverId: currentFriend._id,
        time: new Date(),
        message: {
          text: "",
          image: newImageName,
        },
      });

      const formData = new FormData();

      formData.append("senderName", currentUserInfo.username);
      formData.append("imageName", newImageName);
      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(sendImageMessage(formData));
    }
  };

  if (!authenticate) {
    navigate("/galactchat/login");
  }

  return (
    <div className="messenger">
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />

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
              {activeUser && activeUser.length > 0
                ? activeUser.map((user) => (
                    <ActiveFriend
                      user={user}
                      setCurrentFriend={setCurrentFriend}
                      key={user.userId}
                    />
                  ))
                : ""}
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
          activeUser={activeUser}
          typingMessage={typingMessage}
        />
      </div>
    </div>
  );
};

export default ChatMain;
