import { FC } from "react";

import Container from "@/components/Container";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";

interface IProps {
  params: Promise<{ slug: string }>;
}

const PostPage: FC<IProps> = async ({ params }) => {
  const { slug } = await params;

  const response = await basicFetch<PostType[]>(`/posts`, {
    params: {
      slug,
    },
  });

  if (!response) return null;

  console.log(response);

  const data = response.data[0];

  return <Container>{data.title}</Container>;
};

export default PostPage;
