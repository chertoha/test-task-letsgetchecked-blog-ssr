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
      <article className="border-b border-gray-300 py-5">
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">{publish_date}</p>
          <p className="text-gray-800 text-sm underline">{author}</p>
        </div>

        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="pt-3 text-gray-500">{description}</p>

        <Link href={ROUTES.POSTS + "/" + slug}>View more</Link>
      </article>
    </>
  );
};

export default PostCard;
