import React from "react";
// импорт картинок
import avatarImageExite from '../image/vector.svg';
import avatarImageAdd from '../image/add.svg';
// импорт блока
import Card from './Card';
// импорт компонента
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUserContext = React.useContext(CurrentUserContext);
    const { name, about, avatar } = currentUserContext;
    return (
        <main>
            <section className="profile">
                <div className="profile__fullscrin">
                    <button type="button" className="profile__button" onClick={onEditAvatar}>
                        <img
                            src={avatar}
                            className="profile__avatar-image"
                            alt="На фотографии аватар пользователя"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-author">
                            <h1 className="profile__info-name text-profile">{name}</h1>
                            <button type="button" className="profile__button-edit" onClick={onEditProfile}>
                                <img
                                    src={avatarImageExite}
                                    alt="Значок редактирования профиля"
                                    className="profile__image-edit"
                                />
                            </button>
                        </div>
                        <p className="profile__info-work text">{about}</p>
                    </div>
                </div>
                <button type="button" className="profile__button-add">
                    <img
                        src={avatarImageAdd}
                        alt="Значок добавить"
                        className="profile__image-add"
                        onClick={onAddPlace}
                    />
                </button>
            </section>
            <section className="group">
                {cards.map((card) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}
export default Main;
