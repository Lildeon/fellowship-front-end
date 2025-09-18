import Avater from "@/component/Avater";
import FollowPage from "@/component/FollowPage";
import { Feedloader } from "@/component/Loader";
import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const FollowingComm = () => {
  const { ref, inView } = useInView();

  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["followingcommunity"],
    queryFn: async ({ pageParam }) => {
      return api.get(`following-community?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log({ lastPage: lastPage, pages: pages });
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const pages = data?.pages.flatMap((page) => page.data.pages) || [];
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") {
    return (
      <div className="flex justify-center text-xl font-medium">
        <Feedloader />
      </div>
    );
  } else if (status === "error") {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      {pages.map((page) => (
        <div key={page._id} className="flex gap-3 p-3 border-b border-r">
          <Avater src={page?.coverPhotoUrl} />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <Link to={`/fellowship/${page._id}/post`} className="font-medium">
                {page.name}
              </Link>
              <div className="">
                <FollowPage page={page} url="api/follow-fellowship" />
              </div>
            </div>
            <Link to={`/fellowship/${page._id}/post`} className="line-clamp-2">
              {page.bio}
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-center" ref={ref}>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <div>
              <Feedloader />
            </div>
          ) : hasNextPage ? (
            "Load More"
          ) : (
            "All pages"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default FollowingComm;
