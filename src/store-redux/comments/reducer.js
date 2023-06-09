// Начальное состояние
const initialState = {
	data: {
		items: [],
		count: 0,
	},
	waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
	switch (action.type) {
		case "comments/load-start":
			return {
				...state,
				data: {
					items: [],
					count: 0,
				},
				waiting: true
			};

		case "comments/load-success":
			return { ...state, data: action.payload.data, waiting: false };

		case "comments/load-error":
			return {
				...state,
				data: {
					items: [],
					count: 0,
				},
				waiting: true
			}; //@todo текст ошибки сохранить?

		// case "comments/add-new-comment-success":
		// 	return { ...state, data: action.payload.data, waiting: false };

		default:
			// Нет изменений
			return state;
	}
}

export default reducer;
