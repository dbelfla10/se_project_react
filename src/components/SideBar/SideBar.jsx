import { useContext, useState } from "react";

import "./SideBar.css";
// import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../context/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const isSidebar = useState(true);
  return (
    <div className="sidebar">
      {/* <img src={avatar} alt="Default Avatar" className="sidebar__avatar" /> */}
      <Avatar isSidebar={isSidebar} />
      <p className="sidebar__username">{currentUser?.name}</p>
    </div>
  );
};

export default SideBar;
