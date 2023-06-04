import StoreModule from "../module";

class ProfileState extends StoreModule {

	initState() {
		return {
			data: {},
			waiting: false // признак ожидания загрузки
		}
	}

	/**
	 * Загрузка товаров по id
	 * @param id {String}
	 * @return {Promise<void>}
	 */
	async load(id) {
		// Сброс текущего товара и установка признака ожидания загрузки
		this.setState({
			data: {},
			waiting: true
		});

		try {
			const token = window.localStorage.getItem("token");
			if (token) {
				const response = await fetch(`/api/v1/users/${id}?fields=_id,email,profile(name, phone)`, {
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
					data: json.result,
					waiting: false
				}, 'Загружены данные user');
			}
		} catch (e) {
			// Ошибка при загрузке
			// @todo В стейт можно положить информацию об ошибке
			this.setState({
				data: {},
				waiting: false
			});
		}
	}
}

export default ProfileState;