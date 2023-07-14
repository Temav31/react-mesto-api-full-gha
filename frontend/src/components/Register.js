import React from "react";
import { Link } from 'react-router-dom'
// функциональный компонент
function Register({ isRegister }) {
    // const [] = React.useState({ email: "", password: "" });
    const [registrationDataUser, setRegistrationDataUser] = React.useState({ email: '', password: '' });
    function handleSubmit(event) {
        event.preventDefault();
        isRegister(registrationDataUser);
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setRegistrationDataUser({ ...registrationDataUser, [name]: value });
    }
    return (
        <div className="entrance popup_open">
            <h3 className="entrance__title">Регистрация</h3>
            <form className="popup__form" onSubmit={handleSubmit}>
                <input
                    id="email"
                    minLength="6"
                    maxLength="20"
                    required
                    type="email"
                    className="popup__input popup__input_type_white"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={registrationDataUser.email}
                    onChange={handleChange}
                />
                <span className="popup__error-text  form__error_place_top"></span>
                <input
                    id="password"
                    minLength="6"
                    maxLength="20"
                    required
                    type="password"
                    className="popup__input popup__input_type_white"
                    name="password"
                    placeholder="Пароль"
                    autoComplete="password"
                    value={registrationDataUser.password}
                    onChange={handleChange}
                />
                <span className="popup__error-text form__error_place_bottom"></span>
                <button
                    className="popup__button popup__button_type_white"
                    type="submit">Зарегистрироваться</button>
            </form>
            <div className="entrance__text">
                <p className="entrance__link text">Уже зарегистрированы?
                    
                </p>
                <Link to="/sign-in" className="entrance__link text"> Войти</Link>
            </div>
        </div>
    )
}
export default Register;
