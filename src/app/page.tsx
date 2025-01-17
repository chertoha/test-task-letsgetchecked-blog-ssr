import Container from "@/components/Container";
import PostList from "@/components/PostList";
import Paginator from "@/components/UIKit/Paginator";
import { API_REQUEST_DEFAULT_LIMIT, API_REQUEST_DEFAULT_PAGE } from "@/config/api";
import ROUTES from "@/config/routes";
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

  if (Number.isNaN(Number(totalCount))) return <>Something went wrong</>;

  return (
    <>
      <Container>
        <h1>Home</h1>

        {response?.data && (
          <>
            <PostList list={response.data} />

            <div className="mt-10">
              <Paginator
                route={ROUTES.HOME}
                currentPage={Number(page)}
                perPage={API_REQUEST_DEFAULT_LIMIT}
                totalItems={Number(totalCount)}
                nearbyQtyPages={1}
              />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
