/* eslint-disable react/prop-types */
import { Link } from "react-router";
import Avater from "./Avater";
import Pagemore from "./Pagemore";
import { LazyAutoPauseVideo } from "./LazyPost";
import { poster } from "./poster";
import Comment from "./Comment";
import LikePost from "./LikePost";
import Repost from "./Repost";
import SavePost from "./SavePost";

const PageCard = ({ post }) => {
  const user = localStorage.getItem("user");
  return (
    <div key={post._id} className="px-4 py-3 flex border-b border-r">
      <Link
        to={
          post.branch?._id
            ? `/view/branch/${post.branch?._id}/post`
            : `/view/church/${post.church?._id}/post`
        }
        className="h-fit"
      >
        <Avater src={post.branch?.coverPhotoUrl || post.church?.userPhotoUrl} />
      </Link>

      <div className="w-full ml-2.5 flex flex-col">
        <div className="flex justify-between">
          <Link
            to={
              post.branch?._id
                ? `/view/branch/${post.branch?._id}/post`
                : `/view/church/${post.church?._id}/post`
            }
            className="self-start"
          >
            <p className="text-lg font-medium">
              {post.branch?.name || post.church?.name}
            </p>

            <p>{post.branch?.tag}</p>
          </Link>
          <div>
            <Pagemore postId={`${post._id}`} />
          </div>
        </div>

        <Link to={`/page-post/${post._id}`}>
          {post?.content && <p className="line-clamp-[10]">{post?.content}</p>}

          {post?.imageUrl && (
            <div className="overflow-hidden">
              <img
                src={post?.imageUrl}
                className="w-fit h-fit rounded-2xl"
                loading="lazy"
              />
            </div>
          )}
          {post?.videoUrl && (
            <div>
              <LazyAutoPauseVideo src={post?.videoUrl} poster={poster} />
            </div>
          )}
        </Link>

        <div className="grid grid-cols-4 pt-3 gap-x-5 min-[800px]:gap-x-20">
          <div className="flex gap-1">
            <Comment
              postID={`${post._id}`}
              url="page-post/comment"
              qKey="pageposts"
            />
            {post.comments.length > 0 && post.comments.length}
          </div>
          <div className="flex gap-1">
            <LikePost
              postID={`${post._id}`}
              like="page-post-like"
              liked={{
                liked: post.likes?.includes(user)
                  ? "size-6 stroke-red-700 fill-red-700"
                  : "size-6 stroke-black",
              }}
              qKey="pageposts"
            />
            {post.likes.length > 0 && post.likes.length}
          </div>
          <div className="flex gap-1">
            <Repost
              postID={`${post._id}`}
              repost="page-post-repost"
              reposted={{
                reposted: post.reposts?.includes(user)
                  ? "size-6 stroke-purple-500 stroke-2"
                  : "size-6 stroke-black stroke-2",
              }}
              qKey="pageposts"
            />
            {post.reposts.length > 0 && post.reposts.length}
          </div>
          <div className="flex gap-1">
            <SavePost
              postID={`${post._id}`}
              bookmark="page-post-bookmark"
              booked={{
                booked: post?.bookmark.includes(user)
                  ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                  : "size-6 stroke-black stroke-2",
              }}
              qKey="pageposts"
            />
            {post?.bookmark.length > 0 && post?.bookmark.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
