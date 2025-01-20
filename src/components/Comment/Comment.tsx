import { FC } from "react";

import EditableComment from "../EditableComment";

import { CommentType } from "@/types/entities";
import { dateToString, isToday } from "@/utils/datetime";

import "./Comment.styled.css";

interface IProps {
  comment: CommentType;
}

const Comment: FC<IProps> = ({ comment: { id, user, content, date } }) => {
  return (
    <article className="comment-article">
      <footer className="comment-footer">
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

      <div className="comment-content-wrapper">
        <EditableComment content={content} commentId={id} />
      </div>
    </article>
  );
};

export default Comment;
