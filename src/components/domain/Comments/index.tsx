import { IComment } from "models/data";
import { CommentsContainer } from "./styles";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

interface IProps {
  postId: string;
  comments: IComment[];
}
const Comments = ({ postId, comments }: IProps) => {
  return (
    <CommentsContainer>
      <CommentForm contentsId={postId} />
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
