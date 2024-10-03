import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <p className="header__date-and-location">Today, Tamarac</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Rosa Meltroso</p>
        <img src={avatar} alt="Rosa Meltroso" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
