import { useEffect } from "react";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

function Allbranch() {
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
    queryKey: ["allbranches"],
    queryFn: async ({ pageParam }) => {
      return await api.get(`api/branches-all?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const branches = data?.pages.flatMap((page) => page.data.branches);
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
      <h2 className="text-xl font-bold px-1 text-center">All Branches</h2>

      <SearchPage url="api/all-branches" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {branches.map((branch) => (
          <div key={branch._id} className="flex gap-3 px-4 py-3">
            <Avatar className="w-15 h-15 rounded-full border">
              <AvatarImage src={branch?.userPhotoUrl} />
              <AvatarFallback>photo</AvatarFallback>
            </Avatar>

            <div className="w-full">
              <div className="flex justify-between flex-wrap">
                <Link
                  to={`/view/branch/${branch._id}/post`}
                  className="text-lg font-medium"
                >
                  {branch.name}
                </Link>
                <FollowPage page={branch} url="api/follow-branch" />
              </div>
              <Link
                to={`/view/branch/${branch._id}/post`}
                className="flex gap-x-5 flex-wrap"
              >
                <div>{branch.pastor}</div>
                <div>{branch.tag}</div>
                <div>{branch.branch}</div>
              </Link>
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
}

export default Allbranch;
