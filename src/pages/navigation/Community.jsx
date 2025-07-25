import { useEffect, useState } from "react";
import { Link } from "react-router";
import Repost from "@/component/Repost";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Delete from "@/component/Delete";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { LazyAutoPauseVideo } from "@/component/LazyPost";
import { Separator } from "@/components/ui/separator";

const RepostCommunity = () => {
  const user = localStorage.getItem("user");
  const [reposts, setReposts] = useState([]);
  const [page, setPage] = useState(() => {
    const comNum = sessionStorage.getItem("comNum");
    return comNum ? parseInt(comNum) : 1;
  });
  const [totalPages, setTotalpages] = useState();

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  console.log(reposts);
  const fetchMorePosts = async () => {
    const res = await api.get(`/community-repost?page=${page}&limit=50`);
    const data = await res.data;
    setReposts([...data.posts]);
    setTotalpages(data.totalPages);
  };

  useEffect(() => {
    fetchMorePosts();
    sessionStorage.setItem("comNum", page);
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
      {reposts.length > 0 &&
        reposts.map((repost) => (
          <div key={repost._id} className="px-4 flex gap-2.5 border-t border-r">
            <Link
              to={`/fellowship/${repost.page._id}/post`}
              className="h-fit mt-3"
            >
              <Avater src={repost.page?.coverPhotoUrl} alt="P" />
            </Link>

            <div className="flex flex-col w-full mt-3">
              <div className="flex justify-between">
                <Link
                  to={`/fellowship/${repost.page._id}/post`}
                  className="font-medium"
                >
                  {repost.page.name}
                </Link>
                <Delete
                  postId={`${repost._id}`}
                  url="delete-repost-fellowship"
                  onToggle={Toggle}
                />
              </div>

              <Link to={`/fellowship-post/${repost.post?._id}`}>
                {repost.post?.content && <p>{repost.post?.content}</p>}

                {repost.post?.imageUrl && (
                  <div className="overflow-hidden">
                    <img
                      src={repost.post?.imageUrl}
                      className="w-fit h-fit rounded-2xl"
                    />
                  </div>
                )}
                {repost.post?.videoUrl && (
                  <div>
                    <LazyAutoPauseVideo
                      src={repost.post?.videoUrl}
                      poster={poster}
                    />
                  </div>
                )}
              </Link>
              {repost.post !== null && (
                <div className="grid grid-cols-4 py-3 gap-x-5 min-[800px]:gap-x-20">
                  <div className="flex gap-1">
                    <Comment
                      postID={`${repost.post?._id}`}
                      url="api/fellowship-comment"
                    />
                    {repost.post?.comments.length > 0 &&
                      repost.post?.comments.length}
                  </div>

                  <div className="flex gap-1">
                    <LikePost
                      postID={`${repost.post?._id}`}
                      like="api/fellowship-like"
                      onToggle={Toggle}
                      liked={{
                        liked: repost.post?.likes.find((id) => id === user)
                          ? "size-6 stroke-red-700 fill-red-700"
                          : "size-6 stroke-black",
                      }}
                    />
                    {repost.post?.likes.length > 0 && repost.post?.likes.length}
                  </div>
                  <div className="flex gap-1">
                    <Repost
                      postID={`${repost.post?._id}`}
                      repost="api/fellowship-repost"
                      onToggle={Toggle}
                      reposted={{
                        reposted: repost.post?.reposts.find((id) => id === user)
                          ? "size-6 stroke-purple-500 stroke-2"
                          : "size-6 stroke-black stroke-2",
                      }}
                    />
                    {repost.post?.reposts.length > 0 &&
                      repost.post?.reposts.length}
                  </div>
                  <div className="flex gap-1">
                    <SavePost
                      postID={`${repost.post?._id}`}
                      bookmark="api/fellowship-bookmark"
                      onToggle={Toggle}
                      booked={{
                        booked: repost.post?.bookmark.includes(user)
                          ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                          : "size-6 stroke-black stroke-2",
                      }}
                    />
                    {repost.post?.bookmark.length > 0 &&
                      repost.post?.bookmark.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      {reposts.length !== 0 && <Separator />}
      <div>
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          className={
            reposts.length === 0 ? "hidden" : "flex justify-self-center"
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

export default RepostCommunity;
