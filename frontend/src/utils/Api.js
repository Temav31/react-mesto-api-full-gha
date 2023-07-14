class Api {
	constructor(basePath) {
		this._basePath = basePath;
		// this._token = token;
	}
	_getHeaders() {
		return {
			// authorization: this._token,
			authorization: `Bearer ${this._token}`,
			'Content-Type': 'application/json'
		}
	}
	_getJson(res) {
		console.log(res);
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	getProfile() {
		const token = localStorage.getItem("token");
		const p = fetch(`${this._basePath}/users/me`, {
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
		return p.then(this._getJson);
	};
	setUserInfo(item) {
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/users/me`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(item),
		})
			.then(this._getJson);
	}
	setUserAvatar(item) {
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(item),
		})
			.then(this._getJson);
	}
	getCardList() {
		const token = localStorage.getItem("token");
		const c = fetch(`${this._basePath}/cards`, {
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
		return c.then(this._getJson);
	};
	addCard(item) {
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/cards`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(item),
		})
			.then(this._getJson);
	}
	removeCard(id) {
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/cards/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
			.then(this._getJson);
	}
	сhangeLikeCard(id, isLiked) {
		const token = localStorage.getItem("token");
		if (isLiked) {
			return fetch(`${this._basePath}/cards/${id}/likes`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
					authorization: `Bearer ${token}`,
				},
			})
				.then(this._getJson);
		}
		else {
			return fetch(`${this._basePath}/cards/${id}/likes`, {
				method: "DELETE",
				headers: {
					"content-type": "application/json",
					authorization: `Bearer ${token}`,
				},
			})
				.then(this._getJson);
		}
	}
}
// класс апи
// const api = new Api('https://mesto.nomoreparties.co/v1/cohort-62', '1a6e0a32-00a7-4ba0-818b-d0147d70095f');
const api = new Api('http://localhost:3000');
// экспортирем класс
export default api;
