import React from 'react';
import '../index.css'
// импорт основных блоков
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// импорт попапов
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
// импорт картинок
import ImagePopup from './ImagePopup';
// импорт компонентов
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
// импорт апи
import api from '../utils/Api'
import auth from '../utils/ApiAuth'
// функциональный компонент
function App() {
	const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
	const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
	const [cards, setCards] = React.useState([]);
	// авторизация
	const [result, setResult] = React.useState(true);
	const [authoriz, setАuthoriz] = React.useState(false);
	const [email, setEmail] = React.useState("");
	// навигация 
	const navigate = useNavigate();
	// функии для попапов
	function handleEditProfileClick() {
		setisEditProfilePopupOpen(true);
	}
	function handleAddPlaceClick() {
		setisAddPlacePopupOpen(true);
	}
	function handleEditAvatarClick() {
		setisEditAvatarPopupOpen(true);
	}
	function handleCardClick(card) {
		setSelectedCard({
			name: card.name,
			link: card.link,
		});
	}
	function closeAllPopups() {
		setisEditProfilePopupOpen(false);
		setisAddPlacePopupOpen(false);
		setisEditAvatarPopupOpen(false);
		setSelectedCard({ name: '', link: '' });
		// setIsInfoTooltip(false);
		setIsInfoTooltipPopupOpen(false);
	}
	// функции для карточки
	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.сhangeLikeCard(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function handleCardDelete(id) {
		console.log(id)
		api.removeCard(id)
			.then(() => {
				setCards((cards) => cards.filter((c) => c._id !== id));
			})
			.catch((err) => {
				console.log(err);
			});
	}
	// функции для редактирования данных
	function handleUpdateUser(newData) {
		console.log(newData);
		api.setUserInfo(newData)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}
	function handleUpdateAvatar(data) {
		api.setUserAvatar(data)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}
	function handleAddPlaceSubmit(card) {
		api.addCard(card)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}
	// хук эфекта с получением данных из апи
	React.useEffect(() => {
		if (!authoriz) return;
		api.getProfile()
			.then((data) => {
				setCurrentUser(data);
			})
			.catch((err) => {
				console.log(err);
			});
		api.getCardList()
			.then((data) => {
				setCards(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [authoriz]);
	// Новый спринт
	// выход
	function handleExit() {
		setАuthoriz(false);
		localStorage.removeItem("token");
		navigate("/sign-in");
	}
	// авторизация 
	function handleLogin(dataLog) {
		auth.authorization(dataLog)
			.then((data) => {
				if (data.token) {
					localStorage.setItem("token", data.token);
					setАuthoriz(true);
					navigate("/mesto");
				}
			})
			.catch((err) => {
				setResult(false);
				setIsInfoTooltipPopupOpen(true);
				console.log(err);
			})
	}
	// регистрация 
	function handleRegister(data) {
		auth.registration(data)
			.then(() => {
				setResult(true);
				navigate("/sign-in");
			})
			.catch((err) => {
				setResult(false);
				console.log(err);
			})
			.finally(() => {
				setIsInfoTooltipPopupOpen(true);
			})
	}
	// приверка
	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			auth.check(token)
				.then((data) => {
					setАuthoriz(true);
					setEmail(data.data.email);
					navigate("/react-mesto-auth", { replace: true });
				})
				.catch((err) => {
					console.log(err)
				});
		}
	}, [navigate]);
	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header
					userEmail={email}
					isLogin={authoriz}
					isExit={handleExit}
				/>
				<Routes>
					<Route
						path="/sign-in"
						element={<Login isLogin={handleLogin} />}
					/>
					<Route
						path="/sign-up"
						element={<Register isRegister={handleRegister} />}
					/>
					<Route
						path="*"
						element={authoriz ? <Navigate to="/react-mesto-auth" /> : <Navigate to="/sign-in" />}
					/>
					<Route
						path="/react-mesto-auth"
						element={
							<ProtectedRoute
								isLogin={authoriz}
								element={Main}
								onEditProfile={handleEditProfileClick}
								onEditAvatar={handleEditAvatarClick}
								onAddPlace={handleAddPlaceClick}
								cards={cards}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDelete}
								onCardClick={handleCardClick}
							/>
						}
					/>
				</Routes>
				<Footer />
				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
				<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
				<AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
				<InfoTooltip
					isOpen={isInfoTooltipPopupOpen}
					onClose={closeAllPopups}
					result={result}
				/>
				<ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
			</CurrentUserContext.Provider>
		</div >
	);
}
export default App;
