import React from "react";
import popupImageClose from '../image/close.svg';
import successImage from '../image/Successfully.png';
import failedImage from '../image/Failed.png';
// компонент для папапа с картинкой
function InfoTooltip({ isOpen, onClose,  result}) {
    // надпись успешного или неуспешного входа
    const textImage = result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
    // картинка
    const image = result ? successImage : failedImage;
    return (
        <div className={`popup popup_type_info` + (isOpen && " popup_open")}>
            <div className="popup__elements">
                    <button type="reset" className=" popup__close">
                        <img
                            src={popupImageClose}
                            alt="Значок закрытия окна"
                            className="popup__button-close"
                            onClick={onClose}
                        />
                    </button>
                    <div className="popup__container">
                    <img className="popup__info-image" src={image} alt={textImage} />
                    <p className="text-group popup__info-text">{textImage}</p>
                </div>
            </div>
        </div>
    )
}
export default InfoTooltip;