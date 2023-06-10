export default {
	/**
	 * Загрузка товара
	 * @param id
	 * @return {Function}
	 */
	load: (id) => {
		return async (dispatch, getState, services) => {
			// Сброс текущего товара и установка признака ожидания загрузки
			dispatch({ type: 'comment/load-start' });

			try {
				const res = await services.api.request({
					url: `api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
				});
				dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });

			} catch (e) {
				//Ошибка загрузки
				dispatch({ type: 'comments/load-error' });
			}
		}
	},

	addNewComment: (data) => {
		return async (dispatch, getState, services) => {
			dispatch({ type: 'comment/load-start' });

			try {
				const res = await services.api.request({
					url: `api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
					method: 'POST',
					body: JSON.stringify(data),
				});
				//@ Комментарий успешно отправлен
				dispatch({ type: 'comments/add-new-comment-success', payload: { data: res.data.result } });

			} catch (e) {
				//Ошибка загрузки
				dispatch({ type: 'comments/load-error' });
			}
		}
	},
}
