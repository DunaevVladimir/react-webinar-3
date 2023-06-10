import { memo, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function Comments({ list, renderItem, count }) {

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