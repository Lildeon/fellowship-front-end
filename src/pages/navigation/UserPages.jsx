import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";
import { useInView } from "react-intersection-observer";

const UserPages = () => {
  const { id } = useParams();

  const { ref, inView } = useInView();
  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/user-pages/${id}?page=${pageParam}&limit=4`);
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
    queryKey: ["pageposts", "userpages", id],
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
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.posts?.map((post, i) => (
            <div key={i} className="flex gap-2.5 px-4 py-3 border-b border-r">
              <Link
                to={
                  post.branch?._id
                    ? `/view/branch/${post.branch?._id}/post`
                    : `/view/church/${post.church?._id}/post`
                }
                className="h-fit"
              >
                <Avater
                  src={post.church?.coverPhotoUrl || post.branch?.coverPhotoUrl}
                  alt="P"
                />
              </Link>

              <div className="flex flex-col w-full">
                <Link
                  to={
                    post.branch?._id
                      ? `/view/branch/${post.branch?._id}/post`
                      : `/view/church/${post.church?._id}/post`
                  }
                >
                  <p className="font-medium block">
                    {post.church?.name || post.branch?.name}
                  </p>
                  <p>{post.branch?.tag}</p>
                </Link>

                <Link to={`/page-post/${post.post?._id}`}>
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
                        url="page-post/comment"
                        qKey="pageposts"
                      />
                      {post.post.comments.length > 0 &&
                        post.post.comments.length}
                    </div>
                    <div className="flex gap-1">
                      <LikePost post={post.post} like="page-post-like" />
                      {post.post.likes.length > 0 && post.post.likes.length}
                    </div>
                    <div className="flex gap-1">
                      <Repost
                        post={post.post}
                        repost="page-post-repost"
                        qKey="pageposts"
                      />
                      {post.post.reposts.length > 0 && post.post.reposts.length}
                    </div>
                    <div className="flex gap-1">
                      <SavePost
                        post={post.post}
                        bookmark="page-post-bookmark"
                        qKey="pageposts"
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

export default UserPages;
