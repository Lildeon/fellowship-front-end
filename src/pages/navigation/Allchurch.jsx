import { useEffect } from "react";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Feedloader } from "@/component/Loader";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

function Allchurch() {
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
    queryKey: ["allchurches"],
    queryFn: async ({ pageParam }) => {
      return await api.get(`api/churches-all?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const churches = data?.pages.flatMap((page) => page.data.churches);
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
      <h2 className="text-xl font-bold px-1 text-center">All Churches</h2>

      <SearchPage url="api/all-churches" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {churches.map((church) => (
          <div key={church._id} className="flex gap-3 px-4 py-3 ">
            <Avatar className="w-15 h-15 border rounded-full">
              <AvatarImage src={church?.userPhotoUrl} />
              <AvatarFallback>photo</AvatarFallback>
            </Avatar>

            <div className="w-full">
              <div className="flex justify-between flex-wrap">
                <Link
                  to={`/view/church/${church._id}/post`}
                  className="text-lg font-medium"
                >
                  {church.name}
                </Link>
                <div>
                  <FollowPage page={church} url="api/follow-church" />
                </div>
              </div>
              <Link
                to={`/view/church/${church._id}/post`}
                className="line-clamp-3"
              >
                {church.bio}
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
            "All churches"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}

export default Allchurch;
