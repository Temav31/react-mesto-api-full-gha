import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import PopupWithForm from './PopupWithForm.js'
// Функциональный компонент
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const currentUserContext = React.useContext(CurrentUserContext);
    const avatarLink = React.useRef();
    React.useEffect(() => {
        if(isOpen){
            avatarLink.current.value = "";
        }
        else{
            avatarLink.current.value = currentUserContext.avatar;
        }
    }, [currentUserContext, isOpen])
    function handleSubmit(event) {
		// console.log(avatarLink.current.value);
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarLink.current.value,
        })
    };
    return (
        <PopupWithForm
            title="Обновить аватар"
            name="profile"
            textButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label popup__label_type_profile">
                <input
                    id="avata-input"
                    name="avatar"
                    type="url"
                    className="popup__input popup__input_text_profile"
                    placeholder="Ссылка на картинку"
                    required=""
                    ref={avatarLink}
                />
                <span className="popup__error-text avata-input-error text" />
            </label>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;
