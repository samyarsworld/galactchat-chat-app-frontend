import React, { useEffect } from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import MessageArea from "./MessageArea";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../store/actions/chatAction";

const Messenger = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state) => state.chat);
  const { myInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./images/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.username} </h3>
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
                  {" "}
                  <FaSistrix />{" "}
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
                    <div className="hover-friend">
                      <Friends friend={fd} key={fd.id} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        <MessageArea />
      </div>
    </div>
  );
};

export default Messenger;
