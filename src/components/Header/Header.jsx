import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

function Header({
  handleAddClick,
  handleSignupClick,
  handleLoginClick,
  weatherData,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {!isLoggedIn ? (
        <>
          <button
            onClick={handleSignupClick}
            className="header__signup-button"
            type="button"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            className="header__login-button"
            type="button"
          >
            Log In
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <Avatar />
              {/* <img
                src={avatar}
                alt="Terrence Tegegne"
                className="header__avatar"
              /> */}
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
