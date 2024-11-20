import { useContext, useState } from "react";

import "./SideBar.css";
// import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../context/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

const SideBar = ({ handleLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const isSidebar = useState(true);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {/* <img src={avatar} alt="Default Avatar" className="sidebar__avatar" /> */}
        <Avatar isSidebar={isSidebar} />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button className="sidebar__change-profile-btn" type="button">
        Change profile data
      </button>
      <button
        onClick={handleLogout}
        className="sidebar__logout-btn"
        type="button"
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
