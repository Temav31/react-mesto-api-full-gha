import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import headerLogo from '../image/logo1.svg';
// 
function Header({ isLogin, userEmail, isExit }) {
    // console.log(isLogin);
    // isLogin = false;
    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип"
                className="header__logo"
            />
            <div className="header__authorization">
                {isLogin && <p className="header__email text-profile">{userEmail}</p>}
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<Link to="/sign-in"
                            className="header__link text-profile">Войти</Link>}
                    />
                    <Route
                        path="/sign-in"
                        element={<Link to="/sign-up"
                            className="header__link text-profile">Регистрация</Link>}
                    />
                </Routes>
                {isLogin && <Link to="/sign-in" className="header__link" onClick={isExit}>Выйти</Link>}
            </div>
        </header>
    )
}
export default Header;