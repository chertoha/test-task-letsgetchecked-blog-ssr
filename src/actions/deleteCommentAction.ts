"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { revalidateTag } from "next/cache";

export type DeleteCommentAction = {
  status: "success" | "error";
  message: string;
};

export const deleteCommentAction = async (id: number): Promise<DeleteCommentAction> => {
  try {
    await basicFetch(`/comments/${id}`, {
      method: "DELETE",
    });

    revalidateTag("comments");

    return { status: "success", message: "Comment successfully removed." };
  } catch (_error) {
    return { status: "error", message: "Something went wrong!" };
  }
};
