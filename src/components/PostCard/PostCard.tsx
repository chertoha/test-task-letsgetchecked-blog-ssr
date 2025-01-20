import Link from "next/link";
import { FC } from "react";

import ROUTES from "@/config/routes";
import { PostType } from "@/types/entities";

import "./PostCard.styled.css";

interface IProps {
  post: PostType;
}

const PostCard: FC<IProps> = ({ post: { slug, title, publish_date, description, author } }) => {
  return (
    <>
      <article className="post-card-article">
        <div className="post-card-article-header">
          <time className="post-card-date " dateTime={new Date(publish_date).toISOString()}>
            {publish_date}
          </time>
          <p className="post-card-author">{author}</p>
        </div>

        <h2 className="post-card-title">{title}</h2>

        <p className="trim-text-two-row post-card-description">{description}</p>

        <div className="post-card-link-wrapper">
          <Link href={ROUTES.POSTS + "/" + slug} className="submit post-card-link">
            View more
          </Link>
        </div>
      </article>
    </>
  );
};

export default PostCard;
