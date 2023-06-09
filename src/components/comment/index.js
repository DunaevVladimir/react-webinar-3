import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ item, onChangeFocus }) {
	const options = { //@ Опции для форматирования даты по локали
		day: 'numeric',
		year: 'numeric',
		month: 'long',
		hour: 'numeric',
		minute: 'numeric',
	}

	const cn = bem('Comment');
	return (
		<div className={cn()}>
			<div className={cn('info')}>
				<div className={cn('userName')}>{item.userName}</div>
				{/* Форматируем с учетом опций и удаляем г. */}
				<div className={cn('date')}>{new Date(item.dateCreate).toLocaleString("ru", options).replace('г.', '')}</div>
			</div>
			<div className={cn('text')}>{item.text}</div>
			<button onClick={() => onChangeFocus(item._id)} className={cn('button')}>Ответить</button>
		</div>
	);
}

export default memo(Comment);