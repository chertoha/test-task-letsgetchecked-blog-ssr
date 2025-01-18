import { CommentType } from "@/types/entities";
import { FC } from "react";

interface IProps {
  comment: CommentType;
}

const Comment: FC<IProps> = ({ comment: { user, content, date } }) => {
  return (
    <article className="max-w-[700px] border-b border-green-600/10 pb-4">
      <footer className="flex items-center text-gray-400 gap-3">
        <p className="text-[13px]">User: {user}</p> /
        <time className="text-xs" dateTime={new Date(date).toISOString()}>
          {date}
        </time>
      </footer>

      <p className="">{content}</p>
    </article>
  );
};

export default Comment;
