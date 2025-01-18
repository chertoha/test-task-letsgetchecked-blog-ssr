"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { CreateCommentFormValues } from "@/types/forms";
import { revalidateTag } from "next/cache";

export type CreateCommentAction = {
  status: "success" | "error";
  message: string;
};

export const createCommentAction = async (
  id: number,
  data: CreateCommentFormValues,
): Promise<CreateCommentAction> => {
  try {
    await basicFetch(`/posts/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ ...data, date: new Date().toISOString() }),
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("comments");

    return { status: "success", message: "Comment successfully created." };
  } catch (error) {
    return { status: "error", message: "Something went wrong!" };
  }
};
