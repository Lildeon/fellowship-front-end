import { useEffect } from "react";
import { Link, useParams } from "react-router";
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

const FellowshipPost = () => {
  const { id } = useParams();

  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam }) => {
    return await api.get(`/api/page-posts/${id}?page=${pageParam}&limit=4`);
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
    queryKey: ["fellowposts", id],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const posts = data?.pages.flatMap((page) => page.data.posts) || [];

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
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex gap-2.5 px-4 py-3 border-b border-r"
        >
          <Avater src={post.fellowship?.coverPhotoUrl} alt="photo" />

          <div className="w-full flex flex-col">
            <div className="font-medium">{post.fellowship.name}</div>
            <Link to={`/fellowship-post/${post._id}`}>
              {post?.content && (
                <p className="line-clamp-[10]">{post?.content}</p>
              )}

              {post?.imageUrl && (
                <div className="overflow-hidden">
                  <img
                    src={post?.imageUrl}
                    className="w-fit h-fit rounded-2xl"
                    loading="lazy"
                  />
                </div>
              )}
              {post?.videoUrl && (
                <div>
                  <LazyAutoPauseVideo src={post?.videoUrl} poster={poster} />
                </div>
              )}
            </Link>
            <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
              <div className="flex gap-1">
                <Comment
                  postID={`${post._id}`}
                  url="api/fellowship-comment"
                  qKey="fellowposts"
                />
                {post.comments.length > 0 && post.comments.length}
              </div>

              <div className="flex gap-1">
                <LikePost
                  post={post}
                  like="api/fellowship-like"
                  qKey="fellowposts"
                />
                {post.likes.length > 0 && post.likes.length}
              </div>

              <div className="flex gap-1">
                <Repost
                  post={post}
                  repost="api/fellowship-repost"
                  qKey="fellowposts"
                />
                {post.reposts.length > 0 && post.reposts.length}
              </div>

              <div className="flex gap-1">
                <SavePost
                  post={post}
                  bookmark="api/fellowship-bookmark"
                  qKey="fellowposts"
                />
                {post?.bookmark.length > 0 && post?.bookmark.length}
              </div>
            </div>
          </div>
        </div>
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

export default FellowshipPost;
