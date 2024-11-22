import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  handleCloseClick,
  isOpen,
  handleLogin,
  handleSignupClick,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  // const resetForm = () => {
  //   setEmail("");
  //   setPassword("");
  // };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <button
        onClick={handleSignupClick}
        className="modal__signup-button"
        type="button"
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
