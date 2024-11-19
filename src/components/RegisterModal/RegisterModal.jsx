import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  handleCloseClick,
  isOpen,
  handleLoginClick,
  handleRegistration,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  const handleUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const disableSubmit = !email || !password || !name || !avatarUrl;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ email, password, name, avatar: avatarUrl });
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatarUrl("");
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      disableSubmit={disableSubmit}
    >
      <label htmlFor="signup-email" className="modal__label">
        Email *{""}
        <input
          type="email"
          className="modal__input"
          id="signup-email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password *{""}
        <input
          type="password"
          className="modal__input"
          id="signup-password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label htmlFor="signup-name" className="modal__label">
        Name *{""}
        <input
          type="text"
          className="modal__input"
          id="signup-name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="avatarURL" className="modal__label">
        Avatar URL *{""}
        <input
          type="url"
          className="modal__input"
          id="avatarURL"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
      <button
        onClick={handleLoginClick}
        className="modal__login-button"
        type="button"
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
