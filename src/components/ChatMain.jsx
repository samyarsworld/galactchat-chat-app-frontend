import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

import useSound from "use-sound";
import notificationSound from "../audio/notification.mp3";
import sendingSound from "../audio/sending.mp3";

import Sidebar from "./Sidebar";
import FriendInfo from "./FriendInfo";
import Friend from "./Friend";
import ChatArea from "./ChatArea";

import { FaSistrix } from "react-icons/fa";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  messageSend,
  messageGet,
  sendImageMessage,
  seenMessage,
  updateMessage,
} from "../store/actions/chatAction";
import { userLogout } from "../store/actions/authAction";

const ChatMain = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");

  const { friends, messages, messageSuccess, message_get_success } =
    useSelector((state) => state.chat);
  const { userInfo, authenticate } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();
  const navigate = useNavigate();

  const [notifySound] = useSound(notificationSound);
  const [sendSound] = useSound(sendingSound);

  // Socket setup
  useEffect(() => {
    // Define the socket inside our useRef mutable object and give the socket port
    socket.current = io("ws://localhost:5000");

    // Adding current user to the online users
    socket.current.emit("addUser", userInfo.id, userInfo);

    // Get real time messages through socket
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    // Get if a friend is typing through socket
    socket.current.on("getTypingMessage", (data) => {
      setTypingMessage(data);
    });

    // Update delivery icon of messages upon message sennkhjbjbkjnjknjk through socket
    socket.current.on("messageDeliveredResponse", (message) => {
      dispatch({
        type: "DELIVERED_MESSAGE",
        payload: {
          messageInfo: message,
        },
      });
    });

    // Update seen icon of messages upon message b   kn mmjn kj through socket
    socket.current.on("messageSeenResponse", (message) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          messageInfo: message,
        },
      });
    });

    // Update delivery icon of messages upon mehjkbhjbjh through socket
    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });
  }, []);

  // Get all online friends through socket
  useEffect(() => {
    socket.current.on("getOnlineUsers", (users) => {
      const filteredUsers = users.filter((user) => user.id !== userInfo.id);
      setOnlineFriends(filteredUsers);
    });
  }, []);

  // Get all friends through backend
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  // Show "a" friend's chat if no friend is chosen through backend
  useEffect(() => {
    if (friends && friends.length > 0 && !currentFriend)
      setCurrentFriend(friends[0].friendInfo);
  }, [friends]);

  // Getting all the previous messages between the current friend and user through backend
  useEffect(() => {
    dispatch(messageGet(currentFriend._id));
  }, [currentFriend?._id]);

  // Adjusting the scroll to see new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === userInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
        dispatch(seenMessage(socketMessage));
        socket.current.emit("messageSeen", socketMessage);
        dispatch({
          type: "UPDATE_LAST_MESSAGE",
          payload: {
            messageInfo: socketMessage,
            status: "seen",
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
      socketMessage.receiverId === userInfo.id
    ) {
      notifySound();
      toast.success(`New message from ${socketMessage.senderName}`);
      dispatch(updateMessage(socketMessage));
      socket.current.emit("messageDelivered", socketMessage);
      dispatch({
        type: "UPDATE_LAST_MESSAGE",
        payload: {
          messageInfo: socketMessage,
          status: "delivered",
        },
      });
    }
  }, [socketMessage]);

  // Set input message in the state
  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);

    // Send you are typing to the friend through socket
    socket.current.emit("typingMessage", {
      senderId: userInfo.id,
      receiverId: currentFriend._id,
      message: e.target.value,
    });
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    sendSound();
    if (newMessage) {
      const data = {
        senderName: userInfo.username,
        receiverId: currentFriend._id,
        message: newMessage,
      };

      // Send typing message is over to the friend through socket
      socket.current.emit("typingMessage", {
        senderId: userInfo.id,
        receiverId: currentFriend._id,
        message: "",
      });

      // Send new message through the backend
      dispatch(messageSend(data));
      setNewMessage("");
    }
  };

  // Complete get and send message through socket
  useEffect(() => {
    if (messageSuccess) {
      socket.current.emit("sendMessage", messages[messages.length - 1]);

      dispatch({
        type: "UPDATE_LAST_MESSAGE",
        payload: {
          messageInfo: messages[messages.length - 1],
          status: "unseen",
        },
      });
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
  }, [messageSuccess]);

  useEffect(() => {
    if (messages.length > 0) {
      if (
        messages[messages.length - 1].senderId !== userInfo.id &&
        messages[messages.length - 1].status !== "seen"
      ) {
        dispatch({
          type: "UPDATE_SEEN",
          payload: {
            id: currentFriend._id,
          },
        });
        socket.current.emit("seen", {
          senderId: currentFriend._id,
          receiverId: userInfo.id,
        });
        dispatch(seenMessage({ _id: messages[messages.length - 1]._id }));
      }
    }
    dispatch({
      type: "MESSAGE_GET_SUCCESS_CLEAR",
    });
  }, [message_get_success]);

  // Add emoji to message
  const sendEmoji = (e) => {
    setNewMessage(`${newMessage}` + e);
    socket.current.emit("typingMessage", {
      senderId: userInfo.id,
      receiverId: currentFriend._id,
      message: e,
    });
  };

  // Add image as message
  const sendImage = (e) => {
    if (e.target.files.length !== 0) {
      sendSound();

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        const img = reader.result;
        const formData = new FormData();

        formData.append("senderName", userInfo.username);
        formData.append("receiverId", currentFriend._id);
        formData.append("image", img);
        dispatch(sendImageMessage(formData));
        // socket.current.emit("sendMessage", {
        //   senderId: userInfo.id,
        //   senderName: userInfo.username,
        //   receiverId: currentFriend._id,
        //   time: new Date(),
        //   message: {
        //     text: "",
        //     image: messages[messages.length - 1],
        //   },
        // });
      };
    }
  };

  const search = (e) => {
    const getFriendClass = document.getElementsByClassName("hover-friend");
    const frienNameClass = document.getElementsByClassName("Fd_name");
    for (var i = 0; i < getFriendClass.length, i < frienNameClass.length; i++) {
      let text = frienNameClass[i].innerText.toLowerCase();
      if (text.indexOf(e.target.value.toLowerCase()) > -1) {
        getFriendClass[i].style.display = "";
      } else {
        getFriendClass[i].style.display = "none";
      }
    }
  };

  const logout = () => {
    dispatch(userLogout());
    socket.current.emit("logout");
  };

  // Responsive toggler
  const [toggleContainer, setToggleContainer] = useState(true);
  const [win, setWin] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWin(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLeft = {
    width: win < 850 && toggleContainer && "100%",
    borderRight: win < 850 && toggleContainer && "4px solid white",
  };
  const toggleRight = {
    display: win < 850 && toggleContainer && "none",
  };

  const toggler = () => {
    const sidebar = document.querySelector(".left-side");
    const togBtn = document.querySelector("#tog");
    if (toggleContainer) {
      sidebar.classList.replace("open", "close");
      ReactDOM.render(<BiArrowFromLeft size={30} />, togBtn);
    } else {
      sidebar.classList.replace("close", "open");
      ReactDOM.render(<BiArrowFromRight size={30} />, togBtn);
    }
    setToggleContainer((prev) => !prev);
  };
  /////

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

      <div className="main">
        <Sidebar logout={logout} />
        <div className="left-side open" style={toggleLeft}>
          <div className="left">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={userInfo.image} alt="" />
                </div>
                <div className="name">
                  <h3>{userInfo.username} </h3>
                </div>
              </div>
              {/* <div className="icons">
              <div className="icon" onClick={toggleLeftSide}>
                <i className="bx bx-menu" id="tog"></i>
              </div>
            </div> */}
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  onChange={search}
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((friend) => (
                    <div
                      className={
                        currentFriend._id === friend.friendInfo._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      key={friend.friendInfo._id}
                      onClick={() => setCurrentFriend(friend.friendInfo)}
                    >
                      <Friend
                        friend={friend}
                        userInfo={userInfo}
                        onlineFriends={onlineFriends}
                      />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>

          <div className="right">
            <FriendInfo
              currentFriend={currentFriend}
              onlineFriends={onlineFriends}
              messages={messages}
            />
          </div>
          <div className="toggler2" onClick={toggler} id="tog">
            <BiArrowFromRight size={30} />
          </div>
        </div>

        <div className="right-side" style={toggleRight}>
          <ChatArea
            currentFriend={currentFriend}
            newMessage={newMessage}
            newMessageHandler={newMessageHandler}
            sendMessage={sendMessage}
            messages={messages}
            scrollRef={scrollRef}
            sendEmoji={sendEmoji}
            sendImage={sendImage}
            onlineFriends={onlineFriends}
            typingMessage={typingMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
