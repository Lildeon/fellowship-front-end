import { useEffect } from "react";
import { Link, useParams } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { poster } from "@/component/poster";
import { useInView } from "react-intersection-observer";
import { Feedloader } from "@/component/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";

const BranchPost = () => {
  const { branch } = useParams();
  const user = localStorage.getItem("user");
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam }) => {
    return await api.get(
      `/api/branch-post/${branch}?page=${pageParam}&limit=4`,
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
    queryKey: ["pageposts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log({ lastPage: lastPage, pages: pages });
      const nextPage = lastPage.data.hasMore ? pages.length + 1 : undefined;
      return nextPage;
    },
  });
  const posts = data?.pages.flatMap((page) => page.data.posts) || [];
  console.log({ branchpost: data });
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
          className="flex gap-2.5 border-b border-r px-4 py-2"
        >
          <Avater src={post.branch?.coverPhotoUrl} alt="P" />
          <div className="w-full flex flex-col">
            <p className="font-medium">{post.branch.name}</p>
            <p>{post.branch?.tag}</p>
            <Link to={`/page-post/${post._id}`}>
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
                <Comment postID={`${post._id}`} url="page-post/comment" />
                {post.comments.length > 0 && post.comments.length}
              </div>

              <div className="flex gap-1">
                <LikePost
                  postID={`${post._id}`}
                  like="page-post-like"
                  liked={{
                    liked: post.likes?.find((id) => id === user)
                      ? "size-6 stroke-red-700 fill-red-700"
                      : "size-6 stroke-black",
                  }}
                  qKey="pageposts"
                />
                {post.likes.length > 0 && post.likes.length}
              </div>
              <div className="flex gap-1">
                <Repost
                  postID={`${post._id}`}
                  repost="page-post-repost"
                  reposted={{
                    reposted: post.reposts?.find((id) => id === user)
                      ? "size-6 stroke-purple-500 stroke-2"
                      : "size-6 stroke-black stroke-2",
                  }}
                  qKey="pageposts"
                />
                {post.reposts.length > 0 && post.reposts.length}
              </div>
              <div className="flex gap-1">
                <SavePost
                  postID={`${post._id}`}
                  bookmark="page-post-bookmark"
                  booked={{
                    booked: post?.bookmark.includes(user)
                      ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                      : "size-6 stroke-black stroke-2",
                  }}
                  qKey="pageposts"
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

export default BranchPost;
