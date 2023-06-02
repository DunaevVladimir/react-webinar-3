import StoreModule from "../module";

class AuthState extends StoreModule {

	initState() {
		return {
			user: {},
			isLogged: false,
		};
	}

	async isLogged() {
		const token = window.localStorage.getItem("token");
		console.log("token", token);
		console.log(!!token)
		if (token) {
			const response = await fetch(`/api/v1/users/self`, {
				method: "GET",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json",
					"X-Token": token,
				},
			});
			const json = await response.json();
			this.setState({
				...this.getState(),
				user: {
					_id: json.result._id,
					name: json.result.profile.name,
					phone: json.result.profile.phone,
					email: json.result.email,
				},
				isLogged: true,
			}, 'Загружены данные user');
		}
	}

	async logout() {
		const token = window.localStorage.getItem("token");
		if (token) {
			const response = await fetch(`/api/v1/users/sign`, {
				method: "DELETE",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json",
					"X-Token": token,
				},
			});
			this.setState({
				...this.getState(),
				user: {},
				isLogged: false,
			}, 'Уничтожаем токен навсегда, навечно, безвозвратно, но вы , конечно, можете получить новый');
			window.localStorage.setItem("token", "");
		}
	}

	async logIn() {
		const response = await fetch(`/api/v1/users/sign`, {
			method: "POST",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"login": "test_1",
				"password": "123456"
			})
		});
		const json = await response.json();
		const { token, user } = json.result;
		console.log("json", json)
		window.localStorage.setItem("token", token);
		this.setState({
			...this.getState(),
			user: {
				_id: user._id,
				name: user.profile.name,
				phone: user.profile.phone,
				email: user.email,
			},
			isLogged: true,
		}, 'Загружены данные user');
	}

}

export default AuthState;