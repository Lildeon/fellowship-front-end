import { useState, useEffect } from "react";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Delete from "@/component/Delete";
import Avater from "@/component/Avater";
import { Separator } from "@/components/ui/separator";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";

const Bookmark = () => {
  const user = localStorage.getItem("user");
  const [bookmark, setBookmark] = useState([]);
  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem("storedPage");
    return storedPage ? parseInt(storedPage) : 1;
  });

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  console.log(bookmark);

  const fetchMorePosts = async () => {
    const res = await api.get(`/bookmark?page=${page}&limit=50`);
    const data = await res.data;
    setBookmark([...data.posts]);
  };

  useEffect(() => {
    fetchMorePosts();
    sessionStorage.setItem("storedPage", page);
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

      {bookmark.length > 0 &&
        bookmark.map((book) => (
          <div key={book._id} className="flex gap-3 border-t border-r px-4">
            <Link to={`/user/${book?.user._id}/post`} className="mt-3">
              <Avater src={book.user?.userPhotoUrl} alt="U" />
            </Link>

            <div className="w-full mt-3">
              <div className="flex justify-between font-medium">
                <Link to={`/user/${book.user._id}/post`}>
                  {book?.user.username}
                </Link>
                <Delete
                  postId={`${book._id}`}
                  url="delete-bookmark-user"
                  onToggle={Toggle}
                />
              </div>
              <div>
                <Link to={`/view/${book.post?._id}`}>
                  {book.post?.content && (
                    <p className="line-clamp-[10]">{book.post?.content}</p>
                  )}

                  {book.post?.imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={book.post?.imageUrl}
                        className="w-fit h-fit rounded-2xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {book.post?.videoUrl && (
                    <div>
                      <LazyAutoPauseVideo
                        src={book.post?.videoUrl}
                        poster={poster}
                      />
                    </div>
                  )}
                </Link>
                {book.post !== null && (
                  <div className="grid grid-cols-4 py-3 gap-x-5 min-[800px]:gap-x-20">
                    <div className="flex gap-1">
                      <Comment postID={`${book.post?._id}`} url="comment" />
                      {book.post?.comments.length > 0 &&
                        book.post?.comments.length}
                    </div>

                    <div className="flex gap-1">
                      <LikePost
                        postID={`${book.post?._id}`}
                        like="like"
                        onToggle={Toggle}
                        liked={{
                          liked: book.post?.likes.find((id) => id === user)
                            ? "size-6 stroke-red-700 fill-red-700"
                            : "size-6 stroke-black",
                        }}
                      />
                      {book.post?.likes.length > 0 && book.post?.likes.length}
                    </div>
                    <div className="flex gap-1">
                      <Repost
                        postID={`${book.post?._id}`}
                        repost="repost"
                        onToggle={Toggle}
                        reposted={{
                          reposted: book.post?.reposts.find((id) => id === user)
                            ? "size-6 stroke-purple-500 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                      />
                      {book.post?.reposts.length > 0 &&
                        book.post?.reposts.length}
                    </div>
                    <div className="flex gap-1">
                      <SavePost
                        postID={`${book.post?._id}`}
                        bookmark="bookmark"
                        onToggle={Toggle}
                        booked={{
                          booked: book.post?.bookmark.includes(user)
                            ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                            : "size-6 stroke-black stroke-2",
                        }}
                      />
                      {book.post?.bookmark.length > 0 &&
                        book.post?.bookmark.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

      <div>{page <= bookmark.length && <Separator />}</div>

      <div>
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          className={
            bookmark.length === 0 ? "hidden" : "flex justify-self-center"
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
      {/* {page >= bookmark.length && (
        <p className="flex justify-self-center">🎉 No more posts</p>
      )} */}
    </div>
  );
};

export default Bookmark;
