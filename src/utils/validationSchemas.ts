import {
  COMMENT_CONTENT_MAX_LENGTH,
  COMMENT_CONTENT_MIN_LENGTH,
  COMMENT_USER_NAME_MAX_LENGTH,
  COMMENT_USER_NAME_MIN_LENGTH,
} from "@/config/constants";
import * as Yup from "yup";

const COMMENT_CONTENT_RULES = Yup.string()
  .min(COMMENT_CONTENT_MIN_LENGTH)
  .max(COMMENT_CONTENT_MAX_LENGTH)
  .required();

export const createCommentFormValidationSchema = Yup.object()
  .shape({
    user: Yup.string()
      .min(COMMENT_USER_NAME_MIN_LENGTH)
      .max(COMMENT_USER_NAME_MAX_LENGTH)
      .required(),

    content: COMMENT_CONTENT_RULES,
  })
  .required();

export const editCommentFormValidationSchema = Yup.object()
  .shape({
    content: COMMENT_CONTENT_RULES,
  })
  .required();
