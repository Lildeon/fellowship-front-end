/* eslint-disable react/prop-types */
import { Link } from "react-router";
import Postmore from "./Postmore";
import Avater from "./Avater";
import Comment from "./Comment";
import LikePost from "./LikePost";
import Repost from "./Repost";
import SavePost from "./SavePost";
import { LazyAutoPauseVideo } from "./LazyPost";
import { poster } from "./poster";

const PostCard = ({ post }) => {
  const user = localStorage.getItem("user");
  return (
    <div className="flex border-b border-r border-r-gray-100 hover:bg-zinc-50 px-4 py-3">
      <div className="mr-2.5">
        <Link to={`/user/${post.user?._id}/post`} className="flex gap-5 h-fit">
          <Avater src={post.user.userPhotoUrl} />
        </Link>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <Link to={`/user/${post.user?._id}/post`} className="font-medium">
            {post.user?.username}
          </Link>
          <Postmore postID={{ id: post._id }} />
        </div>
        <Link to={`/view/${post?._id}`}>
          {post?.content && <p className="line-clamp-[10]">{post?.content}</p>}

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
            <Comment postID={`${post?._id}`} url="comment" qKey="posts" />
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
              qKey="posts"
            />
            {post?.likes.length > 0 && post?.likes.length}
          </div>

          <div className="flex gap-1 ">
            <Repost
              postID={`${post?._id}`}
              repost="repost"
              reposted={{
                reposted: post?.reposts.includes(user)
                  ? "size-6 stroke-purple-500 stroke-2"
                  : "size-6 stroke-black stroke-2",
              }}
              qKey="posts"
            />
            {post?.reposts.length > 0 && post?.reposts.length}
          </div>

          <div className="flex gap-1 ">
            <SavePost
              postID={`${post?._id}`}
              bookmark="bookmark"
              booked={{
                booked: post?.bookmark.includes(user)
                  ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                  : "size-6 stroke-black stroke-2",
              }}
              qKey="posts"
            />
            {post?.bookmark.length > 0 && post?.bookmark.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
