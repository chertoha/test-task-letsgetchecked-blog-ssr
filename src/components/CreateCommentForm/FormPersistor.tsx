"use client";

import { FC, useEffect } from "react";
import { useFormikContext } from "formik";

import { SessionStorage } from "@/services/storage";
import { CreateCommentFormValues } from "@/types/forms";

interface IProps {
  storage: SessionStorage<CreateCommentFormValues> | null;
}

const FormPersistor: FC<IProps> = ({ storage }) => {
  const { values } = useFormikContext<CreateCommentFormValues>();
  useEffect(() => {
    storage?.set(values);
  }, [values, storage]);

  return null;
};

export default FormPersistor;
