"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { BaseActionResponse } from "@/types/actions";
import { CreateCommentFormValues } from "@/types/forms";
import { revalidateTag } from "next/cache";

export const createCommentAction = async (
  id: number,
  data: CreateCommentFormValues,
): Promise<BaseActionResponse> => {
  try {
    await basicFetch(`/posts/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ ...data, date: new Date().toISOString() }),
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("comments");

    return { status: "success", message: "Comment successfully created." };
  } catch (_error) {
    return { status: "error", message: "Something went wrong!" };
  }
};
