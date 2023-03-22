import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ logout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <div className="icon-inner">
          <img src="/images/7377W2.png" alt="H" width="30" />
        </div>
      </div>
      <div className="sidebar-icon">
        <div className="icon-inner" onClick={logout}>
          <FaSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
