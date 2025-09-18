/* eslint-disable react/prop-types */
import { Link } from "react-router";
import Avater from "./Avater";
import { LazyAutoPauseVideo } from "./LazyPost";
import { poster } from "./poster";
import Comment from "./Comment";
import LikePost from "./LikePost";
import Repost from "./Repost";
import SavePost from "./SavePost";

const FellowCard = ({ post }) => {
  return (
    <div key={post._id} className="flex p-5 border-b border-r w-full">
      <div className="mr-2.5">
        <Link to={`/fellowship/${post.fellowship?._id}/post`}>
          <Avater src={post.fellowship?.coverPhotoUrl} />
        </Link>
      </div>
      <div className="w-full flex flex-col">
        <Link
          to={`/fellowship/${post.fellowship?._id}/post`}
          className="font-medium block"
        >
          {post.fellowship?.name}
        </Link>

        <Link to={`/fellowship-post/${post._id}`}>
          {post?.content && <p>{post?.content}</p>}

          {post?.imageUrl && (
            <div className="overflow-hidden">
              <img src={post?.imageUrl} className="w-fit h-fit rounded-2xl" />
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
              url="api/fellowship-comment"
              qKey="fellowposts"
            />
            {post.comments.length > 0 && post.comments.length}
          </div>

          <div className="flex gap-1">
            <LikePost
              post={post}
              like="api/fellowship-like"
              qKey="fellowposts"
            />
            {post.likes.length > 0 && post.likes.length}
          </div>

          <div className="flex gap-1">
            <Repost
              post={post}
              repost="api/fellowship-repost"
              qKey="fellowposts"
            />
            {post.reposts.length > 0 && post.reposts.length}
          </div>

          <div className="flex gap-1">
            <SavePost post={post} qKey="fellowposts" />
            {post?.bookmark.length > 0 && post?.bookmark.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FellowCard;
