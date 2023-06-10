import { forwardRef } from "react";
import CommentReply from "../../components/comment-reply";

//@ hoc для передачи ссылки на реф ниже до конкретного компонента
function ReplyRef(props, ref) {
	return <CommentReply {...props} forwardRef={ref}></CommentReply>
}

export default forwardRef(ReplyRef);