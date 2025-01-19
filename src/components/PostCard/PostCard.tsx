import ROUTES from "@/config/routes";
import { PostType } from "@/types/entities";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  post: PostType;
}

const PostCard: FC<IProps> = ({ post: { slug, title, publish_date, description, author } }) => {
  return (
    <>
      <article className="border-b border-gray-300 py-5 max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center">
          <time className="text-gray-400 text-sm" dateTime={new Date(publish_date).toISOString()}>
            {publish_date}
          </time>
          <p className="text-gray-800 text-sm underline">{author}</p>
        </div>

        <h2 className="text-2xl font-bold mt-4">{title}</h2>

        <p className="trim-text-two-row pt-3 text-gray-500 max-h-[60px]">{description}</p>

        <div className="mt-8 flex justify-end">
          <Link href={ROUTES.POSTS + "/" + slug} className="submit max-[400px]:w-full">
            View more
          </Link>
        </div>
      </article>
    </>
  );
};

export default PostCard;
