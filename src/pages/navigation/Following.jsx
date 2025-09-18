import { Link, useParams } from "react-router";

import { useEffect } from "react";
import Follow from "@/component/Follow";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const Following = () => {
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
    queryKey: ["following", id],
    queryFn: async ({ pageParam }) => {
      return await api.get(`following/${id}?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const following = data?.pages.flatMap((page) => page.data.following) || [];
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
      {following.map((myfollowing) => (
        <div
          key={myfollowing._id}
          className="flex gap-2.5 border-b border-r px-4 py-3"
        >
          <Avater src={myfollowing?.userPhotoUrl} />

          <div className="w-full">
            <div className="flex justify-between">
              <Link
                to={`/user/${myfollowing._id}/post`}
                className="text-lg font-medium"
              >
                {myfollowing.username}
              </Link>

              <div>
                {myfollowing._id !== user && <Follow user={myfollowing} />}
              </div>
            </div>
            <Link to={`/user/${myfollowing._id}/post`}>{myfollowing.bio}</Link>
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
            "All following"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default Following;
