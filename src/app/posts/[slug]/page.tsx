import { FC } from "react";

import Container from "@/components/Container";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import Link from "next/link";
import ROUTES from "@/config/routes";
import { BsArrowLeft } from "react-icons/bs";
import Post from "@/components/Post";
import CommentList from "@/components/CommentList";
import CreateCommentForm from "@/components/CreateCommentForm";
import { Metadata } from "next";
import { ResponseError } from "@/helpers/responseErrors";

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    const response = await basicFetch<PostType[]>(`/posts`, {
      params: {
        slug,
      },
    });

    return {
      title: response?.data[0].title || "Post",
      description: response?.data[0].description || "Blog post information",
    };
  } catch (error) {
    return error instanceof ResponseError && error.response.status === 404
      ? {
          title: `Post`,
        }
      : {
          title: "Something went wrong!",
        };
  }
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

          <div className="mb-4 xl:flex flex-row-reverse items-start gap-[90px]">
            <aside className="flex-grow xl:border-l border-green-600/10 xl:pl-14 xl:pb-[100px] max-xl:mb-8">
              <h3 className="text-md text-gray-500 mb-3">Add comment:</h3>

              <CreateCommentForm postId={data.id} />
            </aside>

            <div className="md:w-[600px] shrink-0">
              <CommentList postId={data.id} />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default PostPage;
