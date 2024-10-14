import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <section className="profiel__sidebar">
        <SideBar />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection />
      </section>
    </div>
  );
};

export default Profile;
