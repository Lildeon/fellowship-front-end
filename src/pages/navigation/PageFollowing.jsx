import Avater from "@/component/Avater";
import { Feedloader } from "@/component/Loader";
import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const PageFollowing = () => {
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
    queryKey: ["followingpage"],
    queryFn: async ({ pageParam }) => {
      return api.get(`following-pages?page=${pageParam}&limit=4`);
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
        <div
          key={page.church?._id || page.branch?._id}
          className="flex px-4 py-3 border-r border-b"
        >
          <div>
            <Avater
              src={page.church?.coverPhotoUrl || page.branch?.coverPhotoUrl}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <Link
                to={
                  page.branch?._id
                    ? `/view/branch/${page.branch?._id}/post`
                    : `/view/church/${page.church?._id}/post`
                }
                className="font-medium"
              >
                {page.church?.name || page.branch?.tag}
              </Link>
            </div>
            <Link
              to={
                page.branch?._id
                  ? `/view/branch/${page.branch?._id}/post`
                  : `/view/church/${page.church?._id}/post`
              }
              className="block"
            >
              {page.church?.bio || page.branch?.bio}
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

export default PageFollowing;
