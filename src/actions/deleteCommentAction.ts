"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { BaseActionResponse } from "@/types/actions";
import { revalidateTag } from "next/cache";

export const deleteCommentAction = async (id: number): Promise<BaseActionResponse> => {
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
