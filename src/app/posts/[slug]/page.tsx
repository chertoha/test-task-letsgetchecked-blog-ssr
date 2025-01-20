import { FC } from "react";
import { Metadata } from "next";
import { headers } from "next/headers";

import Container from "@/components/Container";
import Post from "@/components/Post";
import CommentList from "@/components/CommentList";
import CreateCommentForm from "@/components/CreateCommentForm";
import BackLink from "@/components/UIKit/BackLink";
import ROUTES from "@/config/routes";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import { ResponseError } from "@/helpers/responseErrors";

import "./page.styled.css";

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
  const headersList = await headers();
  const referer = headersList.get("referer");

  const response = await basicFetch<PostType[]>(`/posts`, {
    params: {
      slug,
    },
  });

  if (!response) return null;

  const data = response.data[0];

  return (
    <Container>
      <BackLink href={referer || ROUTES.HOME} />

      <section className="max-w-[1200px] mx-auto">
        <Post data={data} />

        <div className="mt-10">
          <h2 className="comments-heading">Comments:</h2>

          <div className="comments-wrapper">
            <aside className="add-form-wrapper">
              <h3 className="add-form-heading">Add comment:</h3>

              <CreateCommentForm postId={data.id} />
            </aside>

            <div className="comment-list-wrapper">
              <CommentList postId={data.id} />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default PostPage;
