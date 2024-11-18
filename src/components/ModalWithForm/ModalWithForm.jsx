import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  handleCloseClick,
  isOpen,
  onSubmit,
  disableSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={disableSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
