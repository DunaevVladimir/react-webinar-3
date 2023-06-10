import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function CommentReply({ isFirst, exist, focusId, parent, articleId, addNewComment, setFocus, redirect }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		//@ Отправляем только если не пустое поле, заодно убираем лишние пробелы по краям
		if (data.trim()) {
			addNewComment({
				text: data,
				parent: parent,
			});
			setData('');
		}
	}

	const onChange = (data) => {
		setData(data);
	}

	const [data, setData] = useState('');

	const cn = bem('CommentReply');
	return (
		<div className={cn(`${isFirst ? 'first' : ''}`)}>
			{exist
				? <form onSubmit={(e) => handleSubmit(e)} className={cn('form')}>
					<div className={cn('description')}>Новый комментарий</div>
					<textarea value={data} onChange={(e) => onChange(e.target.value)} placeholder="Текст" className={cn('textarea')}></textarea>
					<div className={cn('buttons')}>
						<button type="submit" className={cn('button')}>Отправить</button>
						{articleId !== focusId && <button className={cn('button')} onClick={() => setFocus({ _id: articleId, isFirst: true, parentId: articleId })}>Отмена</button>}
					</div>
				</form>
				: <>
					<button className={cn('button-login')} onClick={redirect}>Войдите</button>
					<span>, чтобы иметь возможность комментировать{articleId !== focusId && '. '}</span>
					{articleId !== focusId && <button className={cn('button-cancel')} onClick={() => setFocus({ _id: articleId, isFirst: true, parentId: articleId })}>Отмена</button>}
				</>
			}
		</div>
	)
}

export default memo(CommentReply);