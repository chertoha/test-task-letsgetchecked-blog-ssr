"use client";

import { FC, useTransition } from "react";
import { Formik } from "formik";
import { MdClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

import Field from "../UIKit/Field";
import SymbolCounter from "../UIKit/SymbolCounter";
import Loader from "../UIKit/Loader";

import { editCommentFormValidationSchema } from "@/utils/validationSchemas";
import { EditCommentFormValues } from "@/types/forms";
import { COMMENT_CONTENT_MAX_LENGTH } from "@/config/constants";
import { editCommentAction } from "@/actions/editCommentAction";

import "./EditCommentForm.styled.css";

interface IProps {
  commentId: number;
  initialValues: EditCommentFormValues;
  close: () => void;
}

const EditCommentForm: FC<IProps> = ({ commentId, initialValues, close }) => {
  const [isPending, startTransition] = useTransition();

  const onSubmitHandler = (values: EditCommentFormValues) => {
    console.log(values);

    startTransition(() => {
      editCommentAction(commentId, values).then(response => {
        if (response.status === "error") {
          alert(response.message);
        }

        close();
      });
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={editCommentFormValidationSchema}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="w-full">
            <SymbolCounter
              symbolsNum={values.content ? values.content.length : 0}
              maxSymbols={COMMENT_CONTENT_MAX_LENGTH}
            >
              <div className="content-field-wrapper">
                <Field name="content" multiple />
              </div>
            </SymbolCounter>

            {isPending ? (
              <div className="w-[50px]">
                <Loader size={17} />
              </div>
            ) : (
              <div className="toolbar-wrapper">
                <button
                  type="submit"
                  className="confirm-button"
                  aria-label="Confirm comment update"
                >
                  <IoMdCheckmark size={17} />
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="cancel-button"
                  aria-label="Cancel comment update"
                >
                  <MdClose size={17} />
                </button>
              </div>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditCommentForm;
