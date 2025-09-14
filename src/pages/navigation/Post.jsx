import ProfilePostMore from "@/component/ProfilePostMore";
import React, { useEffect } from "react";
import api from "@/services/axios";
import { useInView } from "react-intersection-observer";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";

const Post = () => {
  const { ref, inView } = useInView();
  const user = localStorage.getItem("user");
  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/my-posts?page=${pageParam}&limit=4`);
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
              <Link to={`/user/${post.user._id}/post`} className="h-fit">
                <Avater src={post.user?.userPhotoUrl} />
              </Link>

              <div className="flex ml-2.5 flex-col w-full">
                <div className="flex justify-between">
                  <Link
                    to={`/user/${post.user._id}/post`}
                    className="font-medium"
                  >
                    {post.user.username}
                  </Link>
                  <ProfilePostMore
                    postId={`${post._id}`}
                    content={`${post.content}`}
                    url="edit-post"
                    urlDel="delete-post"
                  />
                </div>

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
                        loading="lazy"
                      />
                    </div>
                  )}
                  {post?.videoUrl && (
                    <LazyAutoPauseVideo src={post?.videoUrl} poster={poster} />
                  )}
                </Link>
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
                      unlike="unlike"
                      liked={{
                        liked: post.likes?.includes(user)
                          ? "size-6 stroke-red-400 fill-red-400"
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
                      unrepost="unrepost"
                      reposted={{
                        reposted: post.reposts.includes(user)
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
                      unbookmark="unbookmark"
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

export default Post;
