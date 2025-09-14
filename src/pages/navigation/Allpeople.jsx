import React, { useEffect } from "react";
import { Link } from "react-router";
import Follow from "@/component/Follow";
import Search from "@/component/Search";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const Allpeople = () => {
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
    queryKey: ["allpeople"],
    queryFn: async () => {
      return await api.get("people-all");
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log({ lastPage: lastPage, pages: pages });
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  console.log({ people: data });
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
    <div className="max-w-full max-[500px]:pt-10">
      <h1 className="font-bold text-xl px-1 text-center">People To Follow</h1>

      <Search />
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
            {group.data?.map((pupil, i) => (
              <div key={i} className="flex gap-2.5 px-4 py-3">
                <Link to={`/user/${pupil._id}/post`} className="">
                  <Avater src={pupil?.userPhotoUrl} />
                </Link>
                <div className="w-full">
                  <div className="flex justify-between">
                    <Link
                      to={`/user/${pupil._id}/post`}
                      className="font-medium"
                    >
                      {pupil.username}
                    </Link>
                    <div>
                      {pupil._id !== user && (
                        <Follow
                          userId={`${pupil._id}`}
                          followed={{
                            followed: pupil?.follower.includes(user) ? (
                              <p className="px-5 py-1 h-fit w-28 rounded-2xl border">
                                following
                              </p>
                            ) : (
                              <p className="px-5 py-1 h-fit w-28 rounded-2xl bg-black text-white">
                                follow
                              </p>
                            ),
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <p className="line-clamp-6">{pupil.bio}</p>
                </div>
              </div>
            ))}
          </div>
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
            "No more user"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default Allpeople;
