import { memo, useCallback, useMemo, useState } from "react";
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
import CommentReply from "../../components/comment-reply";
import { useLocation, useNavigate } from "react-router-dom";

function CommentsList() {
	const { t } = useTranslate();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const select = useSelectorRedux(state => ({
		comments: state.comments.data,
		waiting: state.comments.waiting,
		articleId: state.article.data._id,
	}), shallowequal);

	const [focus, setFocus] = useState(select.articleId);

	const exist = useSelector(state => ({
		exists: state.session.exists,
	}));

	//@ Составляем лист также с теми , у кого родитель - _id карточки товара

	const options = {
		list: useMemo(() => ([
			...treeToList(listToTree(select.comments.items, "_id", select.articleId), (item, level) => (
				{
					_id: item._id,
					userName: item.author.profile.name,
					dateCreate: item.dateCreate,
					text: item.text,
					parent: item.parent,
					level: level
				}
			))
		]), [select.comments]),
	};

	const callbacks = {
		//@ Добавление комментария, обновление комментариев и сброс фокуса на стандартный
		addNewComment: useCallback((data) => {
			dispatch(commentsActions.addNewComment(data));
			dispatch(commentsActions.load(select.articleId));
			setFocus(select.articleId)
		}, []),
		//@ Смена фокуса комментария
		changeFocus: useCallback((_id) => { setFocus(_id) }, []),
		//@ Редирект на страницу логина и запоминаем обратный путь
		redirect: useCallback(() => { navigate(`/login`, { state: { back: location.pathname } }) }, []),
	}

	const renders = {
		item: useCallback(item => (
			<>
				<Comment item={item} onChangeFocus={callbacks.changeFocus} />
				{focus === item._id &&
					<CommentReply
						exist={exist.exists}
						focusId={focus}
						parent={{ _id: item._id, _type: "comment" }}
						articleId={select.articleId}
						addNewComment={callbacks.addNewComment}
						setFocus={setFocus}
						redirect={callbacks.redirect}>
					</CommentReply>}
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
				{focus === select.articleId &&
					<CommentReply
						exist={exist.exists}
						focusId={focus}
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