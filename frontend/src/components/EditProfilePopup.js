import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import PopupWithForm from './PopupWithForm.js'
// Функциональный компонент
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }
    function handleChangeDescription(event) {
        setDescription(event.target.value)
    };
    function handleChangeName(event) {
        setName(event.target.value);
    };
    return (
        <PopupWithForm 
        title="Редактировать профиль" 
        name="about" 
        textButton="Сохранить" 
        isOpen={isOpen} 
        onClose={onClose}
        onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    id="name-input"
                    name="name"
                    type="text"
                    className="popup__input popup__input_text_name"
                    required=""
                    minLength={2}
                    maxLength={40}
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="popup__error-text name-input-error text" />
            </label>
            <label className="popup__label">
                <input
                    id="work-input"
                    name="about"
                    type="text"
                    className="popup__input popup__input_text_work"
                    required=""
                    minLength={2}
                    maxLength={200}
                    value={description}
                    onChange={handleChangeDescription}
                />
                <span className="popup__error-text work-input-error text" />
            </label>
        </PopupWithForm>
    )
}
export default EditProfilePopup;
