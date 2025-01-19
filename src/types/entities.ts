export type PostType = {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
};

export type CommentType = {
  id: number;
  postId: number;
  parent_id: number | null;
  user: string;
  date: string;
  content: string;
};
