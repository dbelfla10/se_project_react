import "./Avatar.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import avatar from "../../assets/avatar.png";

function Avatar({ isSidebar }) {
  const currentUser = useContext(CurrentUserContext);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {hasError ? (
        <div
          className={`avatar__placeholder ${
            isSidebar && "avatar__placeholder_sidebar"
          }`}
        >
          {currentUser?.name ? currentUser?.name[0].toUpperCase() : ""}
        </div>
      ) : (
        <img
          src={currentUser?.avatar || avatar}
          alt={currentUser?.name}
          className={`avatar ${isSidebar && "avatar_sidebar"}`}
          onError={() => setHasError(true)}
        />
      )}
    </>
  );
}

export default Avatar;
