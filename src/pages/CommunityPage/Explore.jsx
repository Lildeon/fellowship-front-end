import { Feedloader } from "@/component/Loader";
import SearchComm from "@/component/SearchComm";
import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const CommunityExplore = () => {
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
    queryKey: ["explorefellowships"],
    queryFn: async ({ pageParam }) => {
      return await api.get(`api/fellowship-all?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const pages = data?.pages.flatMap((page) => page.data.fellowships) || [];

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
    <div className="flex flex-col gap-5">
      <div className="pt-5">
        <SearchComm url="api/all-fellowships" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
        {pages.length > 0 &&
          pages.map((page) => (
            <Link to={`/fellowship/${page._id}/post`} key={`${page._id}`}>
              <img
                src={page?.coverPhotoUrl}
                alt="photo"
                className="w-full h-80 rounded-2xl"
              />
              <p className="text-lg font-bold">{page.name}</p>
            </Link>
          ))}
      </div>
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
            "All Communities"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default CommunityExplore;
