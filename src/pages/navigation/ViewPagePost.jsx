import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import { useEffect, useState, Suspense, lazy } from "react";
import { useParams, Link } from "react-router";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { poster } from "@/component/poster";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Branch = lazy(() => import("@/component/Explore"));

const ViewPagePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [toggle, setToggle] = useState(false);

  const Toggle = () => setToggle(!toggle);

  console.log(post);
  const user = localStorage.getItem("user");

  useEffect(() => {
    api.get(`page-post/${id}`).then((res) => setPost(res.data));
  }, [id, toggle]);
  return (
    <div className="flex gap-7 pt-5 max-[500px]:pt-10">
      <div className="w-full">
        {post && (
          <div className="px-5">
            <Link
              className="flex gap-2.5"
              to={
                post.branch?._id
                  ? `/view/branch/${post.branch?._id}/post`
                  : `/view/church/${post.church?._id}/post`
              }
            >
              <Avatar className="border w-15 h-15 ">
                <AvatarImage
                  src={post.branch?.coverPhotoUrl || post.church?.userPhotoUrl}
                />
                <AvatarFallback>photo</AvatarFallback>
              </Avatar>

              <div className="w-full">
                <div>
                  <div className="text-lg min-[500px]:text-xl font-bold">
                    {post.branch?.name || post.church?.name}
                  </div>
                  <div className="flex justify-between">
                    <div>{post.branch?.tag}</div>

                    <div className="max-[500px]:hidden">
                      {post.branch?.branch}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={`/page-post/${post._id}`}>
              {post?.content && (
                <p to={`/page-post/${post._id}`} className="">
                  {post?.content}
                </p>
              )}

              {post?.imageUrl && (
                <div className="overflow-hidden py-5">
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
                    muted
                    autoPlay
                    poster={poster}
                    className="w-full h-full rounded-2xl"
                  >
                    <source src={post?.videoUrl} type="video/mp4" />
                  </video>
                </div>
              )}
            </Link>
            <div className="py-2">
              {new Date(post.createdAt).toUTCString().slice(5, -7)}
            </div>
            <div className="flex justify-between py-3 border-y">
              <div className="flex gap-1">
                <Comment postID={`${post._id}`} url="page-post/comment" />
                {post.comments.length > 0 && post.comments.length}
              </div>
              <div className="flex gap-1">
                <LikePost
                  postID={`${id}`}
                  like="page-post-like"
                  liked={{
                    liked: post.likes?.find((id) => id === user)
                      ? "size-6 stroke-red-700 fill-red-700"
                      : "size-6 stroke-black",
                  }}
                  onToggle={Toggle}
                />
                {post.likes.length > 0 && post.likes.length}
              </div>
              <div className="flex gap-1">
                <Repost
                  postID={`${id}`}
                  repost="page-post-repost"
                  unrepost="page-post-unrepost"
                  reposted={{
                    reposted: post.reposts?.find((id) => id === user)
                      ? "size-6 stroke-purple-500 stroke-2"
                      : "size-6 stroke-black stroke-2",
                  }}
                  onToggle={Toggle}
                />
                {post.reposts.length > 0 && post.reposts.length}
              </div>
              <div className="flex gap-1">
                <SavePost
                  postID={`${id}`}
                  bookmark="page-post-bookmark"
                  onToggle={Toggle}
                  booked={{
                    booked: post?.bookmark.find((id) => id === user)
                      ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                      : "size-6 stroke-black stroke-2",
                  }}
                />
                {post?.bookmark.length > 0 && post?.bookmark.length}
              </div>
            </div>
            <h1 className="pt-10 border-b">comments</h1>
            <div>
              {post &&
                post.comments.map((comment) => (
                  <div key={comment._id} className="border-b p-2 flex gap-3">
                    <Link to={`/user/${comment.user?._id}/post`} className="">
                      <img
                        src=""
                        alt="photo"
                        className="border h-10 w-10 rounded-full"
                      />
                    </Link>
                    <div>
                      <Link to={`/user/${comment.user?._id}/post`}>
                        {comment.user?.username}
                      </Link>
                      <div className="">{comment.content}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:inline ">
        <div className="flex flex-col gap-5 w-sm">
          <Suspense fallback={<p>loading...</p>}>
            <Testimony />
            <Branch />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ViewPagePost;
