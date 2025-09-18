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
          <Postmore postId={`${post._id}`} />
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
            <LikePost post={post} like="like" qKey={"posts"} />
            {post?.likes.length > 0 && post?.likes.length}
          </div>

          <div className="flex gap-1 ">
            <Repost post={post} repost="repost" qKey={"posts"} />
            {post?.reposts.length > 0 && post?.reposts.length}
          </div>

          <div className="flex gap-1 ">
            <SavePost post={post} bookmark="bookmark" qKey={"posts"} />
            {post?.bookmark.length > 0 && post?.bookmark.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
