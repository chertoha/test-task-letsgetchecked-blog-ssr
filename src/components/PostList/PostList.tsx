import { PostType } from "@/types/entities";
import { FC } from "react";

import PostCard from "../PostCard";

interface IProps {
  list: PostType[];
}

const PostList: FC<IProps> = ({ list }) => {
  return (
    <ul>
      {list.map(post => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
