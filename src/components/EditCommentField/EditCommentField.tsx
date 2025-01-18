"use client";

import { FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import EditCommentForm from "../EditCommentForm";

interface IProps {
  commentId: number;
  content: string;
}

const EditCommentField: FC<IProps> = ({ commentId, content }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return isEditMode ? (
    <>
      <EditCommentForm
        commentId={commentId}
        close={() => setIsEditMode(false)}
        initialValues={{ content }}
      />
    </>
  ) : (
    <>
      <p>{content}</p>

      <div className="w-12 shrink-0">
        <div className="flex items-center max-xs:gap-3 max-xs:mt-3">
          <button
            type="button"
            aria-label="Update comment"
            className="toolbar-icon p-1"
            onClick={() => setIsEditMode(true)}
          >
            <MdOutlineEdit size={20} />
          </button>
          <button type="button" aria-label="Delete comment" className="toolbar-icon p-1">
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCommentField;
