"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { EditCommentFormValues } from "@/types/forms";
import { revalidateTag } from "next/cache";

export type EditCommentAction = {
  status: "success" | "error";
  message: string;
};

export const editCommentAction = async (
  id: number,
  data: EditCommentFormValues,
): Promise<EditCommentAction> => {
  try {
    await basicFetch(`/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("comments");

    return { status: "success", message: "Comment successfully updated." };
  } catch (_error) {
    return { status: "error", message: "Something went wrong!" };
  }
};
