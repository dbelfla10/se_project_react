import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { getItems, addItem, deleteItem } from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { register, login } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddItem = (item, resetForm) => {
    addItem(item)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((res) => {
        setClothingItems(res.data);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleCloseClick={closeActiveModal}
          onAddItem={handleAddItem}
        />
        <RegisterModal
          isOpen={activeModal === "signup"}
          handleCloseClick={closeActiveModal}
          handleLoginClick={handleLoginClick}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          handleCloseClick={closeActiveModal}
          handleSignupClick={handleSignupClick}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          onDelete={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
