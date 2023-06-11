import { memo, useCallback, useMemo, useState, useRef, createRef, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Comment from "../../components/comment";
import Comments from "../../components/comments";
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useSelector from "../../hooks/use-selector";
import CommentsLayout from "../../components/comments-layout";
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import ReplyRef from "../reply-ref";
import CommentReply from "../../components/comment-reply";
import { useLocation, useNavigate } from "react-router-dom";

function CommentsList() {
	const { t } = useTranslate();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const refToReply = useRef(null);

	const select = useSelectorRedux(state => ({
		comments: state.comments.data,
		waiting: state.comments.waiting,
		articleId: state.article.data._id,
	}), shallowequal);

	const [focus, setFocus] = useState({
		_id: select.articleId,
		parentId: select.articleId,
		isFirst: true,
	});

	const exist = useSelector(state => ({
		exists: state.session.exists,
		userId: state.session.user._id,
	}));

	//@ Составляем лист также с теми , у кого родитель - _id карточки товара

	const options = {
		list: useMemo(() => ([
			...treeToList(listToTree(select.comments.items, "_id", select.articleId), (item, level) => (
				{
					_id: item._id,
					userName: item.author.profile.name,
					userId: item.author._id,
					dateCreate: item.dateCreate,
					text: item.text,
					parent: item.parent,
					level: level,
					children: item.children,
				}
			))
		]), [select.comments]),
	};

	const callbacks = {
		//@ Добавление комментария, обновление комментариев и сброс фокуса на стандартный
		addNewComment: useCallback((data) => {
			dispatch(commentsActions.addNewComment(data));
			setFocus({ _id: select.articleId, isFirst: true, })
		}, []),
		//@ Смена фокуса комментария
		changeFocus: useCallback((_id) => { setFocus(_id) }, []),
		//@ Редирект на страницу логина и запоминаем обратный путь
		redirect: useCallback(() => { navigate(`/login`, { state: { back: location.pathname } }) }, []),
		//@ Скролл до формы ответа
		toReply: useCallback(() => {
			refToReply.current?.scrollIntoView({ behavior: 'smooth', block: "center" });
		}, []),
	}

	const renders = {
		item: useCallback(item => (
			<>
				<Comment item={item} onChangeFocus={callbacks.changeFocus} userId={exist.userId} onReply={callbacks.toReply}>

				</Comment>
				{focus._id === item._id &&
					<ReplyRef
						ref={refToReply}
						isFirst={focus.isFirst}
						exist={exist.exists}
						focusId={focus._id}
						parent={{ _id: focus.parentId, _type: "comment" }}
						articleId={select.articleId}
						addNewComment={callbacks.addNewComment}
						setFocus={setFocus}
						redirect={callbacks.redirect}>
					</ReplyRef>
				}
			</>
		), [options.comments, t, exist.exists, focus]),
	};

	return (
		<Spinner active={select.waiting}>
			<CommentsLayout>
				<Comments
					parent={{ _id: select.articleId, _type: "article" }}
					list={options.list}
					renderItem={renders.item}
					count={select.comments.count}
					exist={exist.exists} />
				{focus._id === select.articleId &&
					<CommentReply
						exist={exist.exists}
						focusId={focus._id}
						parent={{ _id: select.articleId, _type: "article" }}
						articleId={select.articleId}
						addNewComment={callbacks.addNewComment}
						redirect={callbacks.redirect}>
					</CommentReply>}
			</CommentsLayout>
		</Spinner>
	);
}

export default memo(CommentsList);