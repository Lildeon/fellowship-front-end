import { useState, useEffect } from "react";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import Postmore from "@/component/Postmore";
import api from "@/services/axios";
import { poster } from "@/component/poster";
import Avater from "@/component/Avater";
import { Separator } from "@/components/ui/separator";
import { LazyAutoPauseVideo } from "@/component/LazyPost";

const Home = () => {
  const user = localStorage.getItem("user");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  console.log(posts);
  const [totalPages, setTotalpages] = useState();
  const [toggle, setToggle] = useState(false);

  const Toggle = () => setToggle(!toggle);

  const fetchMorePosts = async () => {
    const res = await api.get(`/feed?page=${page}&limit=50`);
    const data = await res.data;
    setPosts([...data.posts]);
    setTotalpages(data.totalPages);
  };

  useEffect(() => {
    fetchMorePosts();
    localStorage.setItem("currentPage", page);

    // const handleScroll = () => {
    //   const reachedBottom =
    //     window.innerHeight + window.scrollY >=
    //     document.documentElement.scrollHeight - 10;

    //   if (reachedBottom) {
    //     setPage((prev) => prev + 1);
    //     if (page === totalPages) {
    //       setPage(page);
    //     }
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, [toggle, page]);

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
        posts.map((post, i) => (
          <div
            key={i}
            className="flex border-t border-r border-r-gray-100 hover:bg-zinc-50 px-4 py-3"
          >
            <div className="mr-2.5">
              <Link
                to={`/user/${post.user?._id}/post`}
                className="flex gap-5 h-fit"
              >
                <Avater src={post.user.userPhotoUrl} />
              </Link>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <Link
                  to={`/user/${post.user?._id}/post`}
                  className="font-medium"
                >
                  {post.user?.username}
                </Link>
                <Postmore postID={{ id: post._id }} onToggle={Toggle} />
              </div>
              <Link to={`/view/${post?._id}`}>
                {post?.content && (
                  <p className="line-clamp-[10]">{post?.content}</p>
                )}

                {post?.imageUrl && (
                  <div className="overflow-hidden">
                    <img
                      src={post?.imageUrl}
                      className="w-full h-full rounded-2xl object-contain"
                      loading="lazy"
                      alt="photo"
                    />
                  </div>
                )}
                {post?.videoUrl && (
                  <div className="">
                    <LazyAutoPauseVideo src={post?.videoUrl} poster={poster} />
                  </div>
                )}
              </Link>

              <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                <div className="flex gap-1">
                  <Comment postID={`${post?._id}`} url="comment" />
                  {post?.comments.length > 0 && post?.comments.length}
                </div>

                <div className="flex gap-1 grow">
                  <LikePost
                    postID={`${post?._id}`}
                    like="like"
                    liked={{
                      liked: post?.likes.includes(user)
                        ? "size-6 stroke-red-700 fill-red-700"
                        : "size-6 stroke-black",
                    }}
                    onToggle={Toggle}
                  />
                  {post?.likes.length > 0 && post?.likes.length}
                </div>

                <div className="flex gap-1 ">
                  <Repost
                    postID={`${post?._id}`}
                    repost="repost"
                    reposted={{
                      reposted: post?.reposts.find((id) => id === user)
                        ? "size-6 stroke-purple-500 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                    onToggle={Toggle}
                  />
                  {post?.reposts.length > 0 && post?.reposts.length}
                </div>

                <div className="flex gap-1 ">
                  <SavePost
                    postID={`${post?._id}`}
                    bookmark="bookmark"
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
            window.scrollTo(0, 0);
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
            window.scrollTo(0, 0);
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
      {page === totalPages && (
        <p className="flex justify-self-center">🎉 No more posts</p>
      )}
    </div>
  );
};

export default Home;
