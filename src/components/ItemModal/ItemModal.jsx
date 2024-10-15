import "./ItemModal.css";
import closeIconWhite from "../../assets/close-icon-white.svg";

function ItemModal({ activeModal, handleCloseClick, card, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeIconWhite} alt="close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => onDelete(card._id)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
