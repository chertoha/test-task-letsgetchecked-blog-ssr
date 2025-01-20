import { CommentType } from "@/types/entities";

export const mockComment: CommentType = {
  id: 123,
  user: "John Doe",
  content: "This is a test comment",
  date: new Date().toISOString(),
  parent_id: null,
  postId: 1,
};
