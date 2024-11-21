import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import like from "../../assets/like-btn.svg";
import liked from "../../assets/liked.svg";

function ItemCard({ item, onCardClick, handleCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    // console.log(item);
    handleCardLike({ id: item._id, isLiked });
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={isLoggedIn ? "card__like-btn" : "card__like-btn_hidden"}
          onClick={handleLike}
        >
          <img
            className="card__like-image"
            src={isLiked ? liked : like}
            alt={isLiked ? "Liked" : "Like"}
          />
        </button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
