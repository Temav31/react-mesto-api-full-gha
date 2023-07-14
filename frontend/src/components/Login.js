import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// функциональный компонент
function Login({ isLogin }) {
    const [registrationDataUser, setRegistrationDataUser] = React.useState({ email: '', password: '' });
    function handleSubmit(event) {
        event.preventDefault();
        isLogin(registrationDataUser);
        // console.log('hi');
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setRegistrationDataUser({ ...registrationDataUser, [name]: value });
    }
    return (
        <div className="entrance popup_open">
            <h3 className="entrance__title">Вход</h3>
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
                    type="submit">Войти</button>
            </form>
        </div>
    )
}
export default Login;
