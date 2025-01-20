import { FC } from "react";

import parse from "html-react-parser";

import { PostType } from "@/types/entities";

import "./Post.styled.css";

interface IProps {
  data: PostType;
}

const Post: FC<IProps> = ({ data: { title, publish_date, author, content } }) => {
  return (
    <article>
      <h1 className="post-heading">{title}</h1>

      <time className="post-date" dateTime={new Date(publish_date).toISOString()}>
        {publish_date}
      </time>

      <p className="post-author-wrapper">
        Author: <span className="post-author">{author}</span>
      </p>
      {content && <div className="content mt-10">{parse(content)}</div>}
    </article>
  );
};

export default Post;
