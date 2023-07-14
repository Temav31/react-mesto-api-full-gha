import React from "react";
import trashImagePopup from '../image/Trash.svg';
import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
// компонент для папапа с картинкой
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    // const isOwn = card.owner._id === currentUser._id;
    const isOwn = card.owner === currentUser._id;
    // console.log(card.owner._id);
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like_active'}`
    );;
    // для передачи данных в попап картинки
    function handleClick() {
        onCardClick(card);
    }
    function handleClickLike() {
		// console.log('hi');
        onCardLike(card);
    }
    function handleClickDelete() {
        onCardDelete(card._id);
        // console.log(card._id);
    }
    return (
        <div className="card">
            {isOwn && <button className=" card__trash" onClick={handleClickDelete}>
                <img
                    src={trashImagePopup}
                    alt="Значок мусорки"
                    className="card__image-trash"
                />
            </button>}
            <img alt={card.name}
                className="card__image"
                src={card.link}
                onClick={handleClick} 
            />
            <div className=" card__label">
                <h3 className="card__name text-group">{card.name}</h3>
                <div className="card__like-element">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleClickLike}/>
                    <p className="card__numbers-like text">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;
