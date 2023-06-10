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

		// Ответ записываем в стейт
		case "comments/add-new-comment-success":
			return {
				data: {
					...state.data,
					items: [
						...state.data.items,
						action.payload.data
					],
					count: state.data.count + 1,
				}
				, waiting: false
			};

		default:
			// Нет изменений
			return state;
	}
}

export default reducer;
