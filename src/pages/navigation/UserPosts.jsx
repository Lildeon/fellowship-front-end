import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { Separator } from "@/components/ui/separator";

const UserPosts = () => {
  const params = useParams();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState();
  const user = localStorage.getItem("user");
  console.log(posts);

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  const fetchMorePosts = async () => {
    const res = await api.get(`/userposts/${params.id}?page=${page}&limit=50`);
    const data = await res.data;
    setPosts(() => [...data.posts]);
    setTotalpages(data.totalPages);
  };

  useEffect(() => {
    fetchMorePosts();
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
        posts.map((userPost) => (
          <div key={userPost._id} className="flex px-4 py-3 border-t border-r">
            <Avater src={userPost.user?.userPhotoUrl} alt="photo" />
            <div className="w-full ml-2.5 flex flex-col">
              <div className="font-medium">{userPost.user.username}</div>

              <Link to={`/view/${userPost?._id}`}>
                {userPost?.content && <p>{userPost?.content}</p>}

                {userPost?.imageUrl && (
                  <div className="overflow-hidden">
                    <img
                      src={userPost?.imageUrl}
                      alt="photo"
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                )}
                {userPost?.videoUrl && (
                  <LazyAutoPauseVideo
                    src={userPost?.videoUrl}
                    poster={poster}
                  />
                )}
              </Link>
              <div>
                <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                  <div className="flex gap-1">
                    <Comment postID={`${userPost._id}`} url="comment" />
                    {userPost.comments.length > 0 && userPost.comments.length}
                  </div>

                  <div className="flex gap-1">
                    <LikePost
                      postID={`${userPost._id}`}
                      like="like"
                      onToggle={Toggle}
                      liked={{
                        liked: userPost.likes?.find((id) => id === user)
                          ? "size-6 stroke-red-700 fill-red-700"
                          : "size-6 stroke-black",
                      }}
                    />
                    {userPost.likes.length > 0 && userPost.likes.length}
                  </div>

                  <div className="flex gap-1">
                    <Repost
                      postID={`${userPost._id}`}
                      repost="repost"
                      onToggle={Toggle}
                      reposted={{
                        reposted: userPost.reposts?.find((id) => id === user)
                          ? "size-6 stroke-purple-500 stroke-2"
                          : "size-6 stroke-black stroke-2",
                      }}
                    />
                    {userPost.reposts.length > 0 && userPost.reposts.length}
                  </div>

                  <div className="flex gap-1">
                    <SavePost
                      postID={`${userPost._id}`}
                      bookmark="bookmark"
                      onToggle={Toggle}
                      booked={{
                        booked: userPost?.bookmark.find((id) => id === user)
                          ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                          : "size-6 stroke-black stroke-2",
                      }}
                    />
                    {userPost?.bookmark.length > 0 && userPost?.bookmark.length}
                  </div>
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
            window.scrollTo(0, 0);
          }}
          className={posts.length === 0 ? "hidden" : "flex justify-self-center"}
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

export default UserPosts;
