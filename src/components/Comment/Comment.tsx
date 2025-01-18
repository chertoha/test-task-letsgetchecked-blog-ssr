import { CommentType } from "@/types/entities";
import { dateToString, isToday } from "@/utils/datetime";
import { FC } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import EditCommentField from "../EditCommentField";

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
        <EditCommentField content={content} commentId={id} />
        {/* <p>{content}</p>

        <div className="w-12 shrink-0">
          <div className="flex items-center max-xs:gap-3 gap-2 max-xs:mt-3">
            <button type="button" aria-label="Update comment" className="toolbar-icon">
              <MdOutlineEdit size={20} />
            </button>
            <button type="button" aria-label="Delete comment" className="toolbar-icon">
              <MdDeleteOutline size={20} />
            </button>
          </div>
        </div> */}
      </div>
    </article>
  );
};

export default Comment;
