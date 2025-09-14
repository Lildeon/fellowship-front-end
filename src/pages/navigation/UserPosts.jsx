import { useParams } from "react-router";
import React, { useEffect } from "react";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const UserPosts = () => {
  const params = useParams();
  const { ref, inView } = useInView();
  const user = localStorage.getItem("user");
  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/userposts/${params.id}?page=${pageParam}&limit=25`);
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
    queryKey: ["posts", "userposts", params.id],
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
            <div key={i} className="flex px-4 py-3 border-b border-r">
              <Avater src={post.user?.userPhotoUrl} alt="photo" />
              <div className="w-full ml-2.5 flex flex-col">
                <div className="font-medium">{post.user.username}</div>

                <Link to={`/view/${post?._id}`}>
                  {post?.content && (
                    <p className="line-clamp-[10]">{post?.content}</p>
                  )}

                  {post?.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={post?.imageUrl}
                        alt="photo"
                        className="w-full h-full rounded-2xl"
                      />
                    </div>
                  )}
                  {post?.videoUrl && (
                    <LazyAutoPauseVideo src={post?.videoUrl} poster={poster} />
                  )}
                </Link>
                <div>
                  <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                    <div className="flex gap-1">
                      <Comment
                        postID={`${post._id}`}
                        url="comment"
                        qKey="posts"
                      />
                      {post.comments.length > 0 && post.comments.length}
                    </div>

                    <div className="flex gap-1">
                      <LikePost
                        postID={`${post._id}`}
                        like="like"
                        liked={{
                          liked: post.likes?.includes(user)
                            ? "size-6 stroke-red-700 fill-red-700"
                            : "size-6 stroke-black",
                        }}
                        qKey="posts"
                      />
                      {post.likes.length > 0 && post.likes.length}
                    </div>

                    <div className="flex gap-1">
                      <Repost
                        postID={`${post._id}`}
                        repost="repost"
                        reposted={{
                          reposted: post.reposts?.includes(user)
                            ? "size-6 stroke-purple-500 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                        qKey="posts"
                      />
                      {post.reposts.length > 0 && post.reposts.length}
                    </div>

                    <div className="flex gap-1">
                      <SavePost
                        postID={`${post._id}`}
                        bookmark="bookmark"
                        booked={{
                          booked: post?.bookmark.includes(user)
                            ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                        qKey="posts"
                      />
                      {post?.bookmark.length > 0 && post?.bookmark.length}
                    </div>
                  </div>
                </div>
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

export default UserPosts;
