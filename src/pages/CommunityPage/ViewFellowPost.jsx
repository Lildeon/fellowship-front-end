import { useEffect, useState, Suspense, lazy } from "react";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import { Link, useParams } from "react-router";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { poster } from "@/component/poster";

const Fellowship = lazy(() => import("./ExploreFellow"));
const Testimony = lazy(() => import("@/component/GetTestimony"));

const ViewFellowPost = () => {
  const [post, setPost] = useState();
  console.log(post);
  const { id } = useParams();
  const user = localStorage.getItem("user");

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get(`api/view-post/${id}`).then((res) => setPost(res.data));
  }, [id, toggle]);
  return (
    <div className="flex gap-10 p-5 max-[500px]:mt-5">
      <div className="w-full">
        {post && (
          <div key={post._id}>
            <div className="flex gap-3">
              <Link
                to={`/fellowship/${post.fellowship?._id}/post`}
                className="pb-3"
              >
                <Avatar className="w-15 h-15 rounded-full">
                  <AvatarImage src={post.fellowship?.coverPhotoUrl} />
                  <AvatarFallback>photo</AvatarFallback>
                </Avatar>
              </Link>
              <Link
                to={`/fellowship/${post.fellowship?._id}/post`}
                className="text-xl font-medium block"
              >
                {post.fellowship?.name}
              </Link>
            </div>
            <Link to={`/fellowship-post/${post?._id}`}>
              {post?.content && (
                <Link to={`/fellowship-post/${post?._id}`} className="">
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
                  <video
                    controls
                    autoPlay
                    muted
                    poster={poster}
                    className="w-fit h-fit rounded-2xl"
                  >
                    <source src={post?.videoUrl} type="video/mp4" />
                  </video>
                </div>
              )}
            </Link>
            <div className="py-2 text-lg">
              {new Date(post.createdAt).toUTCString().slice(5, -7)}
            </div>
            <div className="grid grid-cols-4 pt-3 gap-x-13 min-[500px]:gap-x-23">
              <div className="flex gap-1">
                <Comment postID={`${post._id}`} url="api/fellowship-comment" />
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
                    reposted: post.reposts?.includes(user)
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
        )}
        <div>
          <h1 className="pt-10 border-b">Comments</h1>
          {post?.comments.length > 0 &&
            post.comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 border-b py-3">
                <Link
                  to={`/user/${comment.user._id}/post`}
                  className="w-10 h-10 border rounded-full"
                >
                  avater
                </Link>

                <div className="flex flex-col">
                  <Link to={`/user/${comment.user._id}/post`}>
                    {comment.user.username}
                  </Link>
                  <div>{comment.content}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="hidden lg:inline w-xl">
        <div className="sticky top-0 flex flex-col gap-5">
          <Suspense fallback={<p>loading...</p>}>
            <Testimony />
            <Fellowship />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ViewFellowPost;
