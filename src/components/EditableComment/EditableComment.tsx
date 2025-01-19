"use client";

import { FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import EditCommentForm from "../EditCommentForm";
import DeleteCommentButton from "../DeleteCommentButton";

interface IProps {
  commentId: number;
  content: string;
}

const EditableComment: FC<IProps> = ({ commentId, content }) => {
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
      <p className="break-words max-w-[82%] md:max-w-[536px]">{content}</p>

      <div className="w-12 shrink-0">
        <div className="flex items-center max-xs:gap-3 max-xs:mt-3">
          <button
            type="button"
            aria-label="Update comment"
            className="toolbar-icon p-1"
            onClick={() => setIsEditMode(true)}
          >
            <MdOutlineEdit size={17} />
          </button>

          <DeleteCommentButton commentId={commentId} />
        </div>
      </div>
    </>
  );
};

export default EditableComment;
