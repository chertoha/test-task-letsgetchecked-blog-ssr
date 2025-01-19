"use client";

import { EditCommentFormValues } from "@/types/forms";
import { Formik } from "formik";
import { FC, useTransition } from "react";
import Field from "../UIKit/Field";
import SymbolCounter from "../UIKit/SymbolCounter";
import { COMMENT_CONTENT_MAX_LENGTH } from "@/config/constants";
import { editCommentFormValidationSchema } from "@/utils/validationSchemas";
import Loader from "../UIKit/Loader";
import { editCommentAction } from "@/actions/editCommentAction";
import { MdClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

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
              <div className="[&>div]:h-[80px] [&>div>textarea]:border-none [&>div>textarea]:bg-transparent">
                <Field name="content" multiple />
              </div>
            </SymbolCounter>

            {isPending ? (
              <div className="w-[50px]">
                <Loader size={17} />
              </div>
            ) : (
              <div className="flex pl-3">
                <button
                  type="submit"
                  className="text-green-600 hover:scale-125 duration-300 transition-transform ease-in-out p-1"
                  aria-label="Confirm comment update"
                >
                  <IoMdCheckmark size={17} />
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="text-red-600 hover:scale-125 duration-300 transition-transform ease-in-out p-1"
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
