import { useEffect, useRef } from "react";
import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React from "react";
import PostCard from "@/component/PostCard";
import { Feedloader } from "@/component/Loader";

const Home = () => {
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/feed?page=${pageParam}&limit=4`);
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
    queryKey: ["posts"],
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

  // function useScrollRestoration(key) {
  //   useEffect(() => {
  //     const saved = sessionStorage.getItem(key);
  //     if (saved) {
  //       window.scrollTo(0, parseInt(saved));
  //     }

  //     const saveScroll = () => {
  //       sessionStorage.setItem(key, window.scrollY);
  //     };

  //     window.addEventListener("beforeunload", saveScroll);
  //     return () => {
  //       saveScroll();
  //       window.removeEventListener("beforeunload", saveScroll);
  //     };
  //   }, [key]);
  // }
  // const loadMoreRef = useRef(null);

  // useEffect(() => {
  //   if (!hasNextPage || isFetchingNextPage) return;
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       fetchNextPage();
  //     }
  //   });
  //   if (loadMoreRef.current) observer.observe(loadMoreRef.current);
  //   return () => observer.disconnect();
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  // useScrollRestoration("home-feed");
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
    <>
      <div>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.posts?.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </React.Fragment>
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
            "No more posts"
          )}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default Home;
