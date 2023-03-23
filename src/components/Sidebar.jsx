import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";

const Sidebar = ({ logout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <div className="icon-inner">
          <GiMaterialsScience size={40} />
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
