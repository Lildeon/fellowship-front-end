import FollowPage from "@/component/FollowPage";
import { Feedloader } from "@/component/Loader";
import SearchComm from "@/component/SearchComm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const Allcommunity = () => {
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
    queryKey: ["allfellowships"],
    queryFn: async ({ pageParam }) => {
      return await api.get(`api/fellowship-all?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const pages = data?.pages.flatMap((page) => page.data.fellowships);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  if (status === "pending") {
    return (
      <div className="flex justify-center">
        <Feedloader />
      </div>
    );
  } else if (status === "error") {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="max-[500px]:pt-10">
      <h1 className="text-xl font-bold px-1 text-center">All Communities</h1>

      <SearchComm url="api/all-fellowships" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {pages.map((page) => (
          <div key={`${page._id}`} className="flex gap-3 px-4 py-3">
            <Avatar className="w-15 h-15 border rounded-full">
              <AvatarImage src={page?.coverPhotoUrl} />
              <AvatarFallback>photo</AvatarFallback>
            </Avatar>

            <div className="w-full">
              <div className="flex justify-between flex-wrap">
                <Link
                  to={`/fellowship/${page._id}/post`}
                  className="font-medium text-lg"
                >
                  {page.name}
                </Link>
                <div>
                  <FollowPage page={page} url="api/follow-fellowship" />
                </div>
              </div>
              <p>{page.slogan}</p>
            </div>
          </div>
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
            "All branches"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default Allcommunity;
