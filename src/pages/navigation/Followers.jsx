import { Link, useParams } from "react-router";
import { useEffect } from "react";
import Follow from "@/component/Follow";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { Feedloader } from "@/component/Loader";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

const Followers = () => {
  const { id } = useParams();
  const user = localStorage.getItem("user");

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
    queryKey: ["followers", id],
    queryFn: async ({ pageParam }) => {
      return await api.get(`followers/${id}?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const followers = data?.pages.flatMap((page) => page.data.followers) || [];
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
      {followers.map((follower) => (
        <div
          key={follower._id}
          className="flex gap-2.5 border-b border-r px-4 py-3"
        >
          <Avater src={follower?.userPhotoUrl} />

          <div className="w-full">
            <div className="flex justify-between">
              <Link
                to={`/user/${follower._id}/post`}
                className="text-lg font-medium"
              >
                {follower.username}
              </Link>

              <div>{follower._id !== user && <Follow user={follower} />}</div>
            </div>
            <Link to={`/user/${follower._id}/post`}>{follower.bio}</Link>
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
            "All followers"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default Followers;
