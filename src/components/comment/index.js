import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ item, onChangeFocus, userId }) {

	const lastChildId = item.children.length ? item.children[item.children.length - 1]._id : item._id;

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
				{/* Если автор это юзер добавляем класс*/}
				<div className={cn(`userName`) + `${userId === item.userId ? ' user' : ''}`}>{item.userName}</div>
				{/* Форматируем с учетом опций и удаляем г. */}
				<div className={cn('date')}>{new Date(item.dateCreate).toLocaleString("ru", options).replace('г.', '')}</div>
			</div>
			<div className={cn('text')}>{item.text}</div>
			<button onClick={() => onChangeFocus({ _id: lastChildId, isFirst: item.children.length === 0, parentId: item._id })} className={cn('button')}>Ответить</button>
		</div>
	);
}

export default memo(Comment);