"use client";

import { EditCommentFormValues } from "@/types/forms";
import { Formik, FormikHelpers } from "formik";
import { FC } from "react";
import Field from "../UIKit/Field";
import SymbolCounter from "../UIKit/SymbolCounter";
import { COMMENT_CONTENT_MAX_LENGTH } from "@/config/constants";
import { editCommentFormValidationSchema } from "@/utils/validationSchemas";

interface IProps {
  commentId: number;
  initialValues: EditCommentFormValues;
  close: () => void;
}

const EditCommentForm: FC<IProps> = ({ commentId, initialValues, close }) => {
  const onSubmitHandler = (
    values: EditCommentFormValues,
    { resetForm }: FormikHelpers<EditCommentFormValues>,
  ) => {
    console.log(values);
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
              <div className="[&>div]:h-[80px] [&>div>textarea]:border-none [&>div>textarea]:bg-transparent">
                <Field name="content" multiple />
              </div>
            </SymbolCounter>

            <button type="submit">submit</button>
            <button type="button" onClick={close}>
              close
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditCommentForm;
