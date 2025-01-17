import Container from "@/components/Container";
import PostList from "@/components/PostList";
import { API_REQUEST_DEFAULT_LIMIT, API_REQUEST_DEFAULT_PAGE } from "@/config/api";
import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import { FC } from "react";

interface IProps {
  searchParams: Promise<{ page: string | undefined }>;
}

const Home: FC<IProps> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || API_REQUEST_DEFAULT_PAGE;

  const response = await basicFetch<PostType[]>("/posts", {
    params: {
      _page: page,
      _limit: API_REQUEST_DEFAULT_LIMIT,
      _sort: "publish_date",
      _order: "asc",
    },
  });

  const totalCount = response?.headers.get("x-total-count");

  return (
    <>
      <Container>
        <h1>Home</h1>

        {response?.data && <PostList list={response.data} />}
      </Container>
    </>
  );
};

export default Home;
