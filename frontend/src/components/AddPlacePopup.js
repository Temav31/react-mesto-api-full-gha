import React from "react";
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import PopupWithForm from './PopupWithForm.js'
// Функциональный компонент
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);
    function handleAddPlaceSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name: name,
            link: link
        })
    }
    function handleChangeName(event) {
        setName(event.target.value);
    };
    function handleChangeLink(event) {
        setLink(event.target.value)
    };
    return (
        <PopupWithForm
            title="Новое место"
            name="place"
            textButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <label className="popup__label">
                <input
                    id="place-input"
                    name="name"
                    type="text"
                    className="popup__input popup__input_text_place"
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="popup__error-text place-input-error text" />
            </label>
            <label className="popup__label">
                <input
                    id="url-input"
                    name="link"
                    type="url"
                    className="popup__input popup__input_text_image"
                    placeholder="Ссылка на картинку"
                    required=""
                    value={link}
                    onChange={handleChangeLink}
                />
                <span className="popup__error-text url-input-error text" />
            </label>
        </PopupWithForm>
    )
}
export default AddPlacePopup;
