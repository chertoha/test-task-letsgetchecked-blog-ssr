import ROUTES from "@/config/routes";
import { PostType } from "@/types/entities";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  post: PostType;
}

const PostCard: FC<IProps> = ({
  post: { id, slug, title, publish_date, description, author, content },
}) => {
  return (
    <>
      <article>
        <h2>{title}</h2>
        <p>{publish_date}</p>
        <p>{description}</p>
        <p>{author}</p>
        <Link href={ROUTES.POSTS + "/" + slug}>View More</Link>
      </article>
    </>
  );
};

export default PostCard;
