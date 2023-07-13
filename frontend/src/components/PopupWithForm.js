import React from "react";
import popupImageClose from '../image/close.svg';

function PopupWithForm({ name, title, textButton, isOpen, onClose, children, onSubmit }) {
    const activePopup = isOpen ? 'popup_open' : '';
    return (
        <div className={`popup popup_type_${name} ${activePopup}`}>
            <div className="popup__elements">
                <button type="reset" className=" popup__close" onClick={onClose}>
                    <img
                        src={popupImageClose}
                        alt="Значок закрытия формы"
                        className="popup__button-close"
                    />
                </button>
                <div className={`popup__container popup__container_type_${name}`}>
                    <h2 className="text-group popup__header">
                        {`${title}`}
                    </h2>
                    <form
                        name={`form-${name}`}
                        className={`popup__form popup__form_type_${name}`}
                        onSubmit={onSubmit}
                    >
                        {children}
                        <button type="submit" className="popup__button text">
                            {`${textButton}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default PopupWithForm;