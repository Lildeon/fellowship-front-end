import Remove from "@/component/Remove";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Delete from "@/component/Delete";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { Separator } from "@/components/ui/separator";

const FavouritePost = () => {
  const user = localStorage.getItem("user");
  const [favourites, setFavourite] = useState([]);
  const [page, setPage] = useState(() => {
    const favPage = sessionStorage.getItem("favPage");
    return favPage ? parseInt(favPage) : 1;
  });
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  console.log(favourites);
  const fetchMorePosts = async () => {
    const res = await api.get(`/favourite?page=${page}&limit=25`);
    const data = await res.data;
    setFavourite([...data.posts]);
  };

  useEffect(() => {
    fetchMorePosts();
    sessionStorage.setItem("favPage", page);
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
      {favourites.length > 0 &&
        favourites.map((favourite) => (
          <div
            key={favourite._id}
            className="flex gap-3 border-t border-r px-4"
          >
            <Link to={`/user/${favourite.user._id}/post`} className="mt-3">
              <Avater src={favourite.user?.userPhotoUrl} alt="U" />
            </Link>

            <div className="w-full mt-3">
              <div className="flex justify-between">
                <Link
                  to={`/user/${favourite.user._id}/post`}
                  className="font-medium"
                >
                  {favourite.user.username}
                </Link>
                <div className="flex gap-2">
                  {favourite.post !== null && (
                    <Remove
                      postID={`${favourite.post?._id}`}
                      onToggle={Toggle}
                    />
                  )}
                  <Delete
                    postId={`${favourite._id}`}
                    url="delete-favourite-post"
                    onToggle={Toggle}
                  />
                </div>
              </div>
              <div>
                <Link to={`/view/${favourite.post?._id}`}>
                  {favourite.post?.content && (
                    <p className="line-clamp-[10]">{favourite.post?.content}</p>
                  )}

                  {favourite.post?.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={favourite.post?.imageUrl}
                        alt="photo"
                        className="w-fit h-fit rounded-2xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {favourite.post?.videoUrl && (
                    <div>
                      <LazyAutoPauseVideo
                        src={favourite.post?.videoUrl}
                        poster={poster}
                      />
                    </div>
                  )}
                </Link>
                {favourite.post !== null && (
                  <div className="grid grid-cols-4 py-3 gap-x-5 min-[800px]:gap-x-20">
                    <div className="flex gap-1">
                      <Comment
                        postID={`${favourite.post?._id}`}
                        url="comment"
                      />
                      {favourite.post?.comments.length > 0 &&
                        favourite.post?.comments.length}
                    </div>

                    <div className="flex gap-1">
                      <LikePost
                        postID={`${favourite.post?._id}`}
                        like="like"
                        onToggle={Toggle}
                        liked={{
                          liked: favourite.post?.likes.find((id) => id === user)
                            ? "size-6 stroke-red-700 fill-red-700"
                            : "size-6 stroke-black",
                        }}
                      />
                      {favourite.post?.likes.length > 0 &&
                        favourite.post?.likes.length}
                    </div>
                    <div className="flex gap-1">
                      <Repost
                        postID={`${favourite.post?._id}`}
                        repost="repost"
                        onToggle={Toggle}
                        reposted={{
                          reposted: favourite.post?.reposts.find(
                            (id) => id === user,
                          )
                            ? "size-6 stroke-purple-500 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                      />
                      {favourite.post?.reposts.length > 0 &&
                        favourite.post?.reposts.length}
                    </div>
                    <div className="flex gap-1">
                      <SavePost
                        postID={`${favourite.post?._id}`}
                        bookmark="bookmark"
                        onToggle={Toggle}
                        booked={{
                          booked: favourite.post?.bookmark.find(
                            (id) => id === user,
                          )
                            ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                      />
                      {favourite.post?.bookmark.length > 0 &&
                        favourite.post?.bookmark.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      <div>{favourites.length !== 0 && <Separator />}</div>
      <div>
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          className={
            favourites.length === 0 ? "hidden" : "flex justify-self-center"
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
    </div>
  );
};

export default FavouritePost;
