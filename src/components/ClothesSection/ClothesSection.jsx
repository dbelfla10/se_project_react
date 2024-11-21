import { useContext } from "react";

import "./ClothesSection.css";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../context/CurrentUserContext";

const ClothesSection = ({ onCardClick, clothingItems, handleAddClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
