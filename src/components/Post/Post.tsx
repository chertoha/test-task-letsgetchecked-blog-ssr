import { PostType } from "@/types/entities";
import { FC } from "react";
import parse from "html-react-parser";

interface IProps {
  data: PostType;
}

const Post: FC<IProps> = ({ data: { title, publish_date, author, content } }) => {
  return (
    <article>
      <h1 className="text-4xl font-bold  text-green-600">{title}</h1>

      <time className="block text-gray-400 mt-4" dateTime={new Date(publish_date).toISOString()}>
        {publish_date}
      </time>

      <p className="mt-2 text-gray-500">
        Author: <span className="text-gray-600 font-bold">{author}</span>
      </p>
      {content && <div className="content mt-10">{parse(content)}</div>}
    </article>
  );
};

export default Post;
