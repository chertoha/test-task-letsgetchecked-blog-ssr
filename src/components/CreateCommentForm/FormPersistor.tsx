"use client";

import { SessionStorage } from "@/services/storage";
import { CreateCommentFormValues } from "@/types/forms";
import { useFormikContext } from "formik";
import { FC, useEffect } from "react";

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
