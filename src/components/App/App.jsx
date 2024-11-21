import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import CurrentUserContext from "../../context/CurrentUserContext";
import { setToken, getToken, removeToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const navigate = useNavigate();

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register({ email, password, name, avatar })
      .then((res) => {
        console.log(res);
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .login({ email, password })
      .then((res) => {
        console.log(res);
        if (res.token) {
          setToken(res.token);
          closeActiveModal();
          setIsLoggedIn(true);
          auth.getUserInfo(res.token).then((res) => {
            setCurrentUser(res);
          });
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleAddItem = (item, resetForm) => {
    const jwt = getToken();
    addItem(item, jwt)
      .then((res) => {
        const addedItem = res.data;
        if (addedItem && addedItem.imageUrl && addedItem.name) {
          setClothingItems([addedItem, ...clothingItems]);
        } else {
          console.error;
        }
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  const handleProfileChange = ({ name, avatar }) => {
    const jwt = getToken();
    auth
      .changeProfile({ name, avatar }, jwt)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeActiveModal();
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
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

  const handleChangeProfileClick = () => {
    setActiveModal("change-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .getUserInfo(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch(console.error);
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
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
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
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
                      handleLogout={handleLogout}
                      handleChangeProfileClick={handleChangeProfileClick}
                      handleCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
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
            handleRegistration={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleCloseClick={closeActiveModal}
            handleSignupClick={handleSignupClick}
            handleLogin={handleLogin}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            onDelete={handleDeleteItem}
          />
          <EditProfileModal
            isOpen={activeModal === "change-profile"}
            handleCloseClick={closeActiveModal}
            handleProfileChange={handleProfileChange}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
