"use client";

import { FC, useTransition } from "react";
import { Formik, FormikHelpers } from "formik";

import SymbolCounter from "../UIKit/SymbolCounter";
import Field from "../UIKit/Field";
import FormPersistor from "./FormPersistor";
import Loader from "../UIKit/Loader";

import { createCommentFormValidationSchema } from "@/utils/validationSchemas";
import { CreateCommentFormValues } from "@/types/forms";
import { createCommentAction } from "@/actions/createCommentAction";
import { SessionStorage } from "@/services/storage";
import { COMMENT_CONTENT_MAX_LENGTH, COMMENT_USER_NAME_MAX_LENGTH } from "@/config/constants";

import "./CreateCommentForm.styled.css";

const initialValues: CreateCommentFormValues = {
  user: "",
  content: "",
};

const storage =
  typeof window !== "undefined"
    ? new SessionStorage<CreateCommentFormValues>("comment_form_values")
    : null;

interface IProps {
  postId: number;
}

const CreateCommentForm: FC<IProps> = ({ postId }) => {

  const storage =
  typeof window !== "undefined"
    ? new SessionStorage<CreateCommentFormValues>(`comment_form_values_${postId}`)
    : null;

  const [isPending, startTransition] = useTransition();

  const onSubmitHandler = (
    { content, user }: CreateCommentFormValues,
    { resetForm }: FormikHelpers<CreateCommentFormValues>,
  ) => {
    startTransition(() => {
      createCommentAction(postId, { content: content.trim(), user: user.trim() }).then(response => {
        if (response.status === "error") {
          alert(response.message);
        }

        resetForm({ values: initialValues });
      });
    });
  };

  return (
    <>
      <Formik
        onSubmit={onSubmitHandler}
        initialValues={storage?.get() || initialValues}
        validationSchema={createCommentFormValidationSchema}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="max-w-[400px]">
            <FormPersistor storage={storage} />

            <SymbolCounter
              symbolsNum={values.user ? values.user.length : 0}
              maxSymbols={COMMENT_USER_NAME_MAX_LENGTH}
            >
              <Field name="user" placeholder="Name" />
            </SymbolCounter>

            <div className="mt-8">
              <SymbolCounter
                symbolsNum={values.content ? values.content.length : 0}
                maxSymbols={COMMENT_CONTENT_MAX_LENGTH}
              >
                <div className="[&>div]:h-[100px]">
                  <Field name="content" multiple placeholder="Comment..." />
                </div>
              </SymbolCounter>
            </div>

            <button type="submit" className="submit create-comment-submit" disabled={isPending}>
              {isPending ? <Loader size={18} color="#ffffff" /> : <>Send</>}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateCommentForm;
