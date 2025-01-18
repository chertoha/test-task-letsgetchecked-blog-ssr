import { FC } from "react";

import Container from "@/components/Container";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import Link from "next/link";
import ROUTES from "@/config/routes";
import { BsArrowLeft } from "react-icons/bs";
import Post from "@/components/Post";
import CommentList from "@/components/CommentList";

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

  const data = response.data[0];

  return (
    <Container>
      <Link
        href={ROUTES.HOME}
        className="inline-block mb-6 hover:text-green-600 transition-colors duration-300 ease-in-out p-2"
        aria-label="Back to home page"
      >
        <BsArrowLeft size={20} />
      </Link>

      <section>
        <Post data={data} />

        <div className="mt-10">
          <h2 className="mb-4 text-green-600 font-bold">Comments:</h2>
          <CommentList postId={data.id} />
        </div>
      </section>
    </Container>
  );
};

export default PostPage;
