import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
  handleChangeProfileClick,
  handleCardLike,
  isLoggedIn,
}) => {
  return (
    <div className="profile">
      <section className="profiel__sidebar">
        <SideBar
          handleLogout={handleLogout}
          handleChangeProfileClick={handleChangeProfileClick}
        />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
};

export default Profile;
