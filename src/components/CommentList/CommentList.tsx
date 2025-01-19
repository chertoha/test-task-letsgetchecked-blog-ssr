import { basicFetch } from "@/helpers/basicFetch";
import { CommentType } from "@/types/entities";
import { FC } from "react";
import Comment from "../Comment/Comment";

interface IProps {
  postId: number;
}

const CommentList: FC<IProps> = async ({ postId }) => {
  const response = await basicFetch<CommentType[]>(`/posts/${postId}/comments`, {
    params: {
      _sort: "date",
      _order: "desc",
    },
    next: { tags: ["comments"] },
  });

  if (!response) return null;

  return (
    <>
      <ul className="space-y-5">
        {response.data.map(comment => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
