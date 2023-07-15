class ApiAuth {
	constructor(url) {
		this._url = url;
		// this._token = token;
	}
	_getHeaders() {
		return {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	}
	_getJson(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	authorization(body) {
		// console.log(body);
		return fetch(`${this._url}/signin`, {
			method: "POST",
			credentials: 'include',
			headers: this._getHeaders(),
			body: JSON.stringify(body)
		})
			.then((res) => this._getJson(res));
	}
	registration(body) {
		// console.log(body);
		return fetch(`${this._url}/signup`, {
			method: "POST",
			credentials: 'include',
			headers: this._getHeaders(),
			body: JSON.stringify(body)
		})
			.then((res) => this._getJson(res));
	}
	check(token) {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
			.then((res) => this._getJson(res));
	}
}
// класс апи 
// const auth = new ApiAuth('https://api.work.tema.nomoredomains.work');
const auth = new ApiAuth('http://localhost:3000');
// const auth = new ApiAuth('https://auth.nomoreparties.co');
// экспортирем класс
export default auth;
