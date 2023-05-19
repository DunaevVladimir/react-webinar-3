import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;
		this.listeners = []; // Слушатели изменений состояния
	}

	/**
	 * Подписка слушателя на изменения состояния
	 * @param listener {Function}
	 * @returns {Function} Функция отписки
	 */
	subscribe(listener) {
		this.listeners.push(listener);
		// Возвращается функция для удаления добавленного слушателя
		return () => {
			this.listeners = this.listeners.filter(item => item !== listener);
		}
	}

	/**
	 * Выбор состояния
	 * @returns {Object}
	 */
	getState() {
		return this.state;
	}

	/**
	 * Установка состояния
	 * @param newState {Object}
	 */
	setState(newState) {
		this.state = newState;
		// Вызываем всех слушателей
		for (const listener of this.listeners) listener();
	}

	/**
	 * Добавление товара в корзину
	 */
	addItemToCart(item) {
		let isHaveItem = this.state.cartList.find(element => item.code === element.code);
		if (isHaveItem) {
			this.setState({
				...this.state,
				totalCost: this.state.totalCost + item.price,
				cartList: this.state.cartList.map((element) => {
					if (element.code === item.code) {
						element.count++;
					}
					return element;
				})
			})
		} else {
			item.count = 1;
			this.setState({
				...this.state,
				totalCost: this.state.totalCost + item.price,
				cartList: [...this.state.cartList, item],
			})
		}
	};

	/**
	 * Удаление товара из корзины
	 * @param code
	 */
	removeItemFromCart(item) {
		this.setState({
			...this.state,
			// Новый список, в котором не будет удаляемой записи
			cartList: this.state.cartList.filter(element => element.code !== item.code),
			totalCost: this.state.totalCost - item.count * item.price
		})
	};

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code === code) {
					// Смена выделения и подсчёт
					return {
						...item,
						selected: !item.selected,
						count: item.selected ? item.count : item.count + 1 || 1,
					};
				}
				// Сброс выделения если выделена
				return item.selected ? { ...item, selected: false } : item;
			})
		})
	}
}

export default Store;
