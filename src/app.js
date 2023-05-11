import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

	const list = store.getState().list;

	return (
		<div className='App'>
			<div className='App-head'>
				<h1>Приложение на чистом JS</h1>
			</div>
			<div className='App-controls'>
				<button onClick={() => store.addItem()}>Добавить</button>
			</div>
			<div className='App-center'>
				<div className='List'>{
					list.map(item =>
						<div key={item.code} className='List-item'>
							<div className={'Item' + (item.selected ? ' Item_selected' : '')}
								onClick={() => store.selectItem(item.code)}>
								<div className='Item-code'>{item.code}</div>
								<div className='Item-title'>{item.title}{item.selections ? ` | Выделяли ${item.selections} раз${item.selections % 10 > 1 && item.selections % 10 < 5 && (item.selections % 100 > 20 || item.selections % 100 < 10) ? 'а' : ''}` : ''}</div> {/* Проверяем количество выделений и в зависимости от цифры добавляем надпись */}
								<div className='Item-actions'>
									<button onClick={(event) => store.deleteItem(event, item.code)}>
										Удалить
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
