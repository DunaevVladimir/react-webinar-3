import { memo, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function Comments({ list, parent, renderItem, count, exist, addNewComment }) {

	const handleSubmit = (e) => {
		e.preventDefault();
		addNewComment({
			_id: "648047135240ea36e3698441",
			text: data,
			parent: parent
		});
	}

	const onChange = (data) => {
		setData(data);
	}

	const [data, setData] = useState('');
	const [currentComment, setCurrentComment] = useState('');

	const cn = bem('Comments');
	return (
		<div className={cn()}>
			<div className={cn('title')}>{`Комментарии: (${count})`}</div>
			{
				list.map(item =>
					//@ Здесь можем регулировать вложенность комментариев
					<div key={item._id} className={cn(`item level-${item.level < 10 ? item.level : 10}`)}>
						{renderItem(item)}
					</div>
				)}
		</div>
	)
}

export default memo(Comments);