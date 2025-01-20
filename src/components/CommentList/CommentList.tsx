import { FC } from "react";

import Comment from "../Comment/Comment";

import { basicFetch } from "@/helpers/basicFetch";
import { CommentType } from "@/types/entities";

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

  return response.data.length > 0 ? (
    <ul className="space-y-5">
      {response.data.map(comment => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="pt-10 italic text-accent">There are no comments yet.</p>
  );
};

export default CommentList;
