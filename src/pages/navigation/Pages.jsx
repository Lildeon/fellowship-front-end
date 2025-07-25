import { useEffect, useState } from "react";
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

const Pages = () => {
  const user = localStorage.getItem("user");
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(() => {
    const pageNum = sessionStorage.getItem("pageNum");
    return pageNum ? parseInt(pageNum) : 1;
  });
  const [totalPages, setTotalpages] = useState();
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  console.log(pages);
  const fetchMorePosts = async () => {
    const res = await api.get(`/pages?page=${page}&limit=50`);
    const data = await res.data;
    setPages([...data.posts]);
    setTotalpages(data.totalPages);
  };

  useEffect(() => {
    fetchMorePosts();
    sessionStorage.setItem("pageNum", page);
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
      {pages.length > 0 &&
        pages.map((page) => (
          <div
            key={page._id}
            className="flex gap-3 px-4 py-3 border-t border-r"
          >
            <Link
              to={
                page.branch?._id
                  ? `/view/branch/${page.branch?._id}/post`
                  : `/view/church/${page.church?._id}/post`
              }
            >
              <Avater
                src={page.church?.coverPhotoUrl || page.branch?.coverPhotoUrl}
                alt="P"
              />
            </Link>

            <div className="w-full">
              <div className="flex justify-between">
                <Link
                  to={
                    page.branch?._id
                      ? `/view/branch/${page.branch?._id}/post`
                      : `/view/church/${page.church?._id}/post`
                  }
                  className="font-medium block"
                >
                  {page.church?.name || page.branch?.tag}
                </Link>
                <Delete
                  postId={page._id}
                  url="delete-repost-page"
                  onToggle={Toggle}
                />
              </div>

              <Link to={`/page-post/${page.post?._id}`}>
                {page.post?.content && (
                  <p className="line-clamp-[10]">{page.post?.content}</p>
                )}

                {page.post?.imageUrl && (
                  <div className="overflow-hidden">
                    <img
                      src={page.post?.imageUrl}
                      className="w-fit h-fit rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                )}
                {page.post?.videoUrl && (
                  <div>
                    <LazyAutoPauseVideo
                      src={page.post?.videoUrl}
                      poster={poster}
                    />
                  </div>
                )}
              </Link>
              {page.post !== null && (
                <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
                  <div className="flex gap-1">
                    <Comment
                      postID={`${page.post?._id}`}
                      url="page-post/comment"
                    />
                    {page.post?.comments.length > 0 &&
                      page.post?.comments.length}
                  </div>
                  <div className="flex gap-1">
                    <LikePost
                      postID={`${page.post?._id}`}
                      like="page-post-like"
                      unlike="page-post-unlike"
                      liked={{
                        liked: page.post?.likes.find((id) => id === user)
                          ? "size-6 stroke-red-700 fill-red-700"
                          : "size-6 stroke-black",
                      }}
                    />
                    {page.post?.likes.length > 0 && page.post?.likes.length}
                  </div>
                  <div className="flex gap-1">
                    <Repost
                      postID={`${page.post?._id}`}
                      repost="page-post-repost"
                      onToggle={Toggle}
                      reposted={{
                        reposted: page.post?.reposts.find((id) => id === user)
                          ? "size-6 stroke-purple-500 stroke-2"
                          : "size-6 stroke-black stroke-2",
                      }}
                    />
                    {page.post?.reposts.length > 0 && page.post?.reposts.length}
                  </div>
                  <div className="flex gap-1">
                    <SavePost
                      postID={`${page.post?._id}`}
                      bookmark="page-post-bookmark"
                      unbookmark="page-post-unbookmark"
                      onToggle={Toggle}
                      booked={{
                        booked: page.post?.bookmark.find((id) => id === user)
                          ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                          : "size-6 stroke-black stroke-2",
                      }}
                    />
                    {page.post?.bookmark.length > 0 &&
                      page.post?.bookmark.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      <div>{pages.length !== 0 && <Separator />}</div>
      <div>
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          className={pages.length === 0 ? "hidden" : "flex justify-self-center"}
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

export default Pages;
