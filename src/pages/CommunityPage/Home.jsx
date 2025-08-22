import { useEffect, useState, Suspense, lazy } from "react";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import { Link } from "react-router";
import api from "@/services/axios";
import { poster } from "@/component/poster";
import Avater from "@/component/Avater";
import { Separator } from "@/components/ui/separator";
import { LazyAutoPauseVideo } from "@/component/LazyPost";

const Search = lazy(() => import("@/component/SearchComm"));
const Fellowship = lazy(() => import("./ExploreFellow"));
const Branch = lazy(() => import("../../component/Explore"));
const Church = lazy(() => import("../../component/ExploreCh"));
const Testimony = lazy(() => import("../../component/GetTestimony"));

const CommunityHome = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("pageCount");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const [totalPages, setTotalpages] = useState();
  const user = localStorage.getItem("user");
  console.log(posts);
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  const fetchMorePosts = async () => {
    const res = await api.get(`/api/fellowship-home?page=${page}&limit=25`);
    const data = await res.data;
    setPosts(() => [...data.posts]);
    setTotalpages(data.totalPages);
  };

  useEffect(() => {
    fetchMorePosts();
    localStorage.setItem("pageCount", page);
  }, [toggle, page]);
  return (
    <div className="flex gap-7">
      <div className="w-full">
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
            <div key={post._id} className="flex p-5 border-t border-r w-full">
              <div className="mr-2.5">
                <Link to={`/fellowship/${post.fellowship?._id}/post`}>
                  <Avater src={post.fellowship?.coverPhotoUrl} />
                </Link>
              </div>
              <div className="w-full flex flex-col">
                <Link
                  to={`/fellowship/${post.fellowship?._id}/post`}
                  className="font-medium block"
                >
                  {post.fellowship?.name}
                </Link>

                <Link to={`/fellowship-post/${post._id}`}>
                  {post?.content && (
                    <Link to={`/fellowship-post/${post._id}`} className="">
                      {post?.content}
                    </Link>
                  )}

                  {post?.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={post?.imageUrl}
                        className="w-fit h-fit rounded-2xl"
                      />
                    </div>
                  )}
                  {post?.videoUrl && (
                    <div>
                      <LazyAutoPauseVideo
                        src={post?.videoUrl}
                        poster={poster}
                      />
                    </div>
                  )}
                </Link>
                <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                  <div className="flex gap-1">
                    <Comment
                      postID={`${post._id}`}
                      url="api/fellowship-comment"
                    />
                    {post.comments.length > 0 && post.comments.length}
                  </div>

                  <div className="flex gap-1">
                    <LikePost
                      postID={`${post._id}`}
                      like="api/fellowship-like"
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
                      repost="api/fellowship-repost"
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
                      bookmark="api/fellowship-bookmark"
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
        <div>
          <Separator />
          <button
            onClick={() => {
              setPage(page + 1);
              if (page === totalPages) {
                setPage(page);
              }
            }}
            className={
              page === totalPages ? "hidden" : "flex justify-self-center"
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
          {page === totalPages && (
            <p className="flex justify-self-center">🎉 No more posts</p>
          )}
        </div>
      </div>
      <div className="hidden lg:inline w-xl">
        <Suspense fallback={<p>loading...</p>}>
          <div className="py-5">
            <Search url="api/all-fellowships" />

            <Testimony />
          </div>
          <div className="flex flex-col gap-5 sticky top-20">
            <Fellowship />
            <Branch />
            <Church />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CommunityHome;
