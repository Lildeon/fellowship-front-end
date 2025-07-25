import ProfilePostMore from "@/component/ProfilePostMore";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { poster } from "@/component/poster";
import { Separator } from "@/components/ui/separator";

const BranchPagePost = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState();
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const [refresh, setRefresh] = useState(false);
  const Toggle = () => setRefresh(!refresh);

  console.log(posts);

  const fetchMorePosts = async () => {
    const res = await api.get(`/api/branch-post/${id}?page=${page}&limit=50`);
    const data = await res.data;
    setPosts(() => [...data.posts]);
    setTotalpages(data.totalPages);
  };

  useEffect(() => {
    fetchMorePosts();
  }, [id, refresh, page]);

  return (
    <div>
      <button
        onClick={() => {
          setPage(page - 1);
          if (page - 1 === 0) {
            setPage(1);
          }
        }}
        className="flex justify-self-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:stroke-purple-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
      {posts.length > 0 &&
        posts.map((post) => (
          <div
            key={post._id}
            className="flex gap-2.5 border-t border-r px-4 py-3 "
          >
            <Avater src={post.branch?.coverPhotoUrl} alt="P" />

            <div className="w-full flex flex-col">
              <div className="flex justify-between">
                <div className="font-medium">{post.branch.name}</div>
                <ProfilePostMore
                  postId={`${post._id}`}
                  content={`${post.content}`}
                  url="api/edit-branch-post"
                  urlDel="api/delete-branch-post"
                  onReload={Toggle}
                />
              </div>

              <Link to={`/page-post/${post._id}`}>
                {post?.content && <p>{post?.content}</p>}

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
                    onToggle={Toggle}
                    liked={{
                      liked: post.likes?.find((id) => id === user)
                        ? "size-6 stroke-red-700 fill-red-700"
                        : "size-6 stroke-black",
                    }}
                  />
                  {post.likes.length > 0 && post.likes.length}
                </div>
                <div className="flex gap-1">
                  <Repost
                    postID={`${post._id}`}
                    repost="page-post-repost"
                    onToggle={Toggle}
                    reposted={{
                      reposted: post.reposts?.find((id) => id === user)
                        ? "size-6 stroke-purple-500 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                  />
                  {post.reposts.length > 0 && post.reposts.length}
                </div>
                <div className="flex gap-1">
                  <SavePost
                    postID={`${post._id}`}
                    bookmark="page-post-bookmark"
                    onToggle={Toggle}
                    booked={{
                      booked: post?.bookmark.includes(user)
                        ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                  />
                  {post?.bookmark.length > 0 && post?.bookmark.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      <div>{posts.length !== 0 && <Separator />}</div>
      <div>
        <button
          onClick={() => {
            setPage(page + 1);
            if (posts.length === totalPages) {
              setPage(totalPages);
            }
          }}
          className={
            posts.length === totalPages ? "hidden" : "flex justify-self-center"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:stroke-purple-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            setPage(1);
          }}
          className={"flex justify-self-end"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:stroke-pink-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      {posts.length === totalPages && (
        <p className="flex justify-self-center">🎉 No more posts</p>
      )}
    </div>
  );
};

export default BranchPagePost;
