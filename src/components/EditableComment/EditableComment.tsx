"use client";

import { FC, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import EditCommentForm from "../EditCommentForm";
import DeleteCommentButton from "../DeleteCommentButton";

import "./EditableComment.styled.css";

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
      <p className="editable-comment-content">{content}</p>

      <div className="edit-button-wrapper">
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
    </>
  );
};

export default EditableComment;
