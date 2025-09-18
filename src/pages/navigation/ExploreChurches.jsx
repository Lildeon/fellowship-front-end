import { Link } from "react-router";
import { useState, useEffect } from "react";
import UserChurch from "./UserChurch";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

function ExploreChurches() {
  const [toggle, setToggle] = useState(
    sessionStorage.getItem("customPages") || "",
  );

  useEffect(() => {
    sessionStorage.setItem("customPages", toggle);
  }, [toggle]);
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
    queryKey: ["explorechurches"],
    queryFn: async ({ pageParam }) => {
      return await api.get(`api/churches-all?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const churches = data?.pages.flatMap((page) => page.data.churches) || [];

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
      <div className="flex max-[500px]:flex-col mb-3">
        <div className="grow">
          <SearchPage url="api/all-churches" />
        </div>
        <select
          className="rounded-2xl w-fit h-fit self-center p-3 border"
          onChange={(e) => setToggle(e.target.value)}
        >
          <option value="">Options</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div>
        <UserChurch status={toggle} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {churches.map((church) => (
          <Link
            to={`/view/church/${church._id}/post`}
            key={church._id}
            className="mt-5 text-xl font-medium"
          >
            <img
              src={church?.coverPhotoUrl}
              alt="photo"
              className="w-full h-80 rounded-2xl"
            />
            <p className="text-lg font-bold">{church.name}</p>
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
            "All churches"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}

export default ExploreChurches;
