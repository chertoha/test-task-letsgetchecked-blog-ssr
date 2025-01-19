import { CommentType } from "@/types/entities";
import { dateToString, isToday } from "@/utils/datetime";
import { FC } from "react";
import EditableComment from "../EditableComment";

interface IProps {
  comment: CommentType;
}

const Comment: FC<IProps> = ({ comment: { id, user, content, date } }) => {
  return (
    <article className="border-b border-green-600/10 pb-4 group">
      <footer className="flex items-center text-gray-400 gap-3">
        <p className="text-[13px]">User: {user}</p> /
        <time className="text-xs" dateTime={new Date(date).toISOString()}>
          {dateToString(new Date(date))}{" "}
          {isToday(new Date(date)) &&
            new Date(date).toLocaleTimeString("en-IE", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
        </time>
      </footer>

      <div className="xs:flex  gap-4 justify-between items-start mt-1">
        <EditableComment content={content} commentId={id} />
      </div>
    </article>
  );
};

export default Comment;
