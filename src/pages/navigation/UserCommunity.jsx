import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import Repost from "@/component/Repost";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const UserCommunity = () => {
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam }) => {
    return await api.get(
      `/user-community-repost/${id}?page=${pageParam}&limit=4`,
    );
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
    queryKey: ["fellowposts", "usercommunity", id],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log({ lastPage: lastPage, pages: pages });
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
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.posts?.map((post, i) => (
            <div key={i} className="px-4 py-3 flex border-b border-r">
              <Avater src={post.page?.coverPhotoUrl} />

              <div className="flex flex-col w-full ml-2.5">
                <Link
                  to={`/fellowship/${post.page._id}/post`}
                  className="font-medium"
                >
                  {post.page.name}
                </Link>

                <Link to={`/fellowship-post/${post.post?._id}`}>
                  {post.post?.content && (
                    <p className="line-clamp-[10]">{post.post?.content}</p>
                  )}

                  {post.post?.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={post.post?.imageUrl}
                        className="w-fit h-fit rounded-2xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {post.post?.videoUrl && (
                    <div>
                      <LazyAutoPauseVideo
                        src={post.post?.videoUrl}
                        poster={poster}
                      />
                    </div>
                  )}
                </Link>
                {post.post !== null && (
                  <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                    <div className="flex gap-1">
                      <Comment
                        postID={`${post.post._id}`}
                        url="api/fellowship-comment"
                        qKey="fellowposts"
                      />
                      {post.post.comments.length > 0 &&
                        post.post.comments.length}
                    </div>

                    <div className="flex gap-1">
                      <LikePost
                        postID={`${post.post._id}`}
                        like="api/fellowship-like"
                        liked={{
                          liked: post.post.likes?.includes(user)
                            ? "size-6 stroke-red-700 fill-red-700"
                            : "size-6 stroke-black",
                        }}
                        qKey="fellowposts"
                      />
                      {post.post.likes.length > 0 && post.post.likes.length}
                    </div>

                    <div className="flex gap-1">
                      <Repost
                        postID={`${post.post._id}`}
                        repost="api/fellowship-repost"
                        reposted={{
                          reposted: post.post.reposts?.includes(user)
                            ? "size-6 stroke-purple-500 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                        qKey="fellowposts"
                      />
                      {post.post.reposts.length > 0 && post.post.reposts.length}
                    </div>

                    <div className="flex gap-1">
                      <SavePost
                        postID={`${post.post._id}`}
                        bookmark="api/fellowship-bookmark"
                        booked={{
                          booked: post.post?.bookmark.includes(user)
                            ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                        qKey="fellowposts"
                      />
                      {post.post?.bookmark.length > 0 &&
                        post.post?.bookmark.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
    </>
  );
};

export default UserCommunity;
