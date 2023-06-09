import { memo, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function CommentReply({ exist, focusId, parent, articleId, addNewComment, setFocus, redirect }) {

	const handleSubmit = (e) => {
		e.preventDefault();
		addNewComment({
			text: data,
			parent: parent,
		});
		setData('');
	}

	const onChange = (data) => {
		setData(data);
	}

	const [data, setData] = useState('');

	const cn = bem('CommentReply');
	return (
		<div className={cn()}>
			{exist
				? <form onSubmit={(e) => handleSubmit(e)} className={cn('form')}>
					<div className={cn('description')}>Новый комментарий</div>
					<textarea value={data} onChange={(e) => onChange(e.target.value)} placeholder="Текст" className={cn('textarea')}></textarea>
					<div className={cn('buttons')}>
						<button type="submit" className={cn('button')}>Отправить</button>
						{articleId !== focusId && <button className={cn('button')} onClick={() => setFocus(articleId)}>Отмена</button>}
					</div>
				</form>
				: <><button onClick={redirect}>Войдите</button><span>, чтобы иметь возможность комментировать</span></>
			}
		</div>
	)
}

export default memo(CommentReply);