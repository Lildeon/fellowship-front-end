import { Suspense, lazy, useEffect } from "react";
import api from "@/services/axios";
import { Feedloader } from "@/component/Loader";
import FellowCard from "@/component/FellowCard";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const Search = lazy(() => import("@/component/SearchComm"));
const Fellowship = lazy(() => import("./ExploreFellow"));
const Branch = lazy(() => import("../../component/Explore"));
const Church = lazy(() => import("../../component/ExploreCh"));
const Testimony = lazy(() => import("../../component/GetTestimony"));

const CommunityHome = () => {
  const { ref, inView } = useInView();
  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/api/fellowship-home?page=${pageParam}&limit=4`);
  };

  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["fellowposts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });

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
    <div className="flex gap-7">
      <div className="w-full">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.posts?.map((post, i) => (
              <FellowCard key={i} post={post} />
            ))}
          </React.Fragment>
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
              "No more posts"
            )}
          </button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
      <div className="hidden lg:inline w-xl">
        <Suspense fallback={<p>loading...</p>}>
          <div className="py-5">
            <Search url="api/all-fellowships" />

            <Testimony />
          </div>
          <div className="flex flex-col gap-5 sticky top-20">
            <Fellowship />
            <Branch />
            <Church />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CommunityHome;
