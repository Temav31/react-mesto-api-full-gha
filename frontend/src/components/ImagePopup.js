import React from "react";
import popupImageClose from '../image/close.svg';
// компонент для папапа с картинкой
function ImagePopup({card, onClose}) {
    // добавление класса для активации
    const activePopup = card.name ? 'popup_open' : '';
    return (
        <div className={`popup popup_type_image ${activePopup}`}>
            <div className="popup__elements-image">
                <button type="reset" className=" popup__close popup__close-group">
                    <img
                        src={popupImageClose}
                        alt="Значок закрытия формы"
                        className="popup__button-close"
                        onClick={onClose}
                    />
                </button>
                <div className="popup__container-image">
                    <img src={card.link} alt={card.name} className="popup__image-image" />
                </div>
                <p className="text popup__text-image">{card.name}</p>
            </div>
        </div>
    )
}
export default ImagePopup;