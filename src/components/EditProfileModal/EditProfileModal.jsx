import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";

const EditProfileModal = ({
  handleCloseClick,
  isOpen,
  handleProfileChange,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  const handleUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileChange({ name, avatar: avatarUrl });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *{""}
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="edit-avatarURL" className="modal__label">
        Avatar URL *{""}
        <input
          type="url"
          className="modal__input"
          id="edit-avatarURL"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
