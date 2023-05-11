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
	 * Добавление новой записи
	 */
	addItem() {
		this.setState({
			...this.state,
			list: [...this.state.list, { code: this.state.list.length + 1, title: 'Новая запись' }]
		})
	};

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(event, code) {
		event.stopPropagation(); //@ Останавливаем всплытие , чтобы не выполнялись лишние функции
		this.setState({
			...this.state,
			list: this.state.list.filter(item => item.code !== code)
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
					item.selected = !item.selected;
				} else {
					item.selected = false; //@ Убираем атрибут у всех кроме элемента, на котором сработало
				}
				return item;
			})
		})
	}
}

export default Store;
