import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
}) => {
  return (
    <div className="profile">
      <section className="profiel__sidebar">
        <SideBar handleLogout={handleLogout} />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
};

export default Profile;
