import { useState, useEffect } from "react";
import { Link } from "react-router";
import UserBranch from "./UserBranch";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const ExploreBranches = () => {
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
    queryKey: ["explorebranches"],
    queryFn: async ({ pageParam }) => {
      return await api.get(`api/branches-all?page=${pageParam}&limit=4`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const branches = data?.pages.flatMap((page) => page.data.branches) || [];

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
          <SearchPage url="api/all-branches" />
        </div>
        <select
          className="rounded-2xl w-fit self-center p-3 border"
          onChange={(e) => setToggle(e.target.value)}
        >
          <option value="">Options</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div>
        <UserBranch status={toggle} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {branches.map((branch) => (
          <Link
            to={`/view/branch/${branch._id}/post`}
            key={branch._id}
            className="block"
          >
            <img
              src={branch?.coverPhotoUrl}
              alt="photo"
              className="h-80 w-full rounded-2xl"
            />
            <p className="text-lg font-bold">{branch.name}</p>

            <div>{branch.tag}</div>
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
            "All branches"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default ExploreBranches;
