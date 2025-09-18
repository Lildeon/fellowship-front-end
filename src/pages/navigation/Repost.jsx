import React, { useEffect } from "react";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import Delete from "@/component/Delete";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { Feedloader } from "@/component/Loader";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

const Repostuser = () => {
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/repost?page=${pageParam}&limit=4`);
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
    queryKey: ["posts", "repost"],
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
    <div>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.posts?.map((post, i) => (
            <div key={i} className="flex px-4 py-3 border-b border-r">
              <Link to={`/user/${post.user?._id}/post`} className="h-fit">
                <Avater src={post.user?.userPhotoUrl} alt="U" />
              </Link>

              <div className="flex flex-col w-full ml-2.5">
                <div className="flex justify-between">
                  <Link
                    to={`/user/${post.user?._id}/post`}
                    className="font-medium"
                  >
                    {post.user?.username}
                  </Link>
                  <div>
                    <Delete postId={`${post?._id}`} url="delete-repost-user" />
                  </div>
                </div>

                <Link to={`/view/${post.post?._id}`}>
                  {post.post?.content && (
                    <p className="line-clamp-[10]">{post.post?.content}</p>
                  )}

                  {post.post?.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={post.post?.imageUrl}
                        className="w-fit h-fit rounded-2xl"
                      />
                    </div>
                  )}
                  {post.post?.videoUrl && (
                    <LazyAutoPauseVideo
                      src={post.post?.videoUrl}
                      poster={poster}
                    />
                  )}
                </Link>
                {post.post !== null && (
                  <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                    <div className="flex gap-1">
                      <Comment
                        postID={`${post.post?._id}`}
                        url="comment"
                        qKey="posts"
                      />
                      {post.post?.comments.length > 0 &&
                        post.post?.comments.length}
                    </div>

                    <div className="flex gap-1">
                      <LikePost post={post.post} like="like" qKey="posts" />
                      {post.post?.likes.length > 0 && post.post?.likes.length}
                    </div>

                    <div className="flex gap-1">
                      <Repost post={post.post} repost="repost" qKey="posts" />
                      {post.post?.reposts.length > 0 &&
                        post.post?.reposts.length}
                    </div>

                    <div className="flex gap-1">
                      <SavePost
                        post={post.post}
                        bookmark="bookmark"
                        qKey="posts"
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
    </div>
  );
};

export default Repostuser;
