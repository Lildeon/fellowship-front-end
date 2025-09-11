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
  const user = localStorage.getItem("user");
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
              qKey="fellowPosts"
            />
            {post.comments.length > 0 && post.comments.length}
          </div>

          <div className="flex gap-1">
            <LikePost
              postID={`${post._id}`}
              like="api/fellowship-like"
              liked={{
                liked: post.likes?.includes(user)
                  ? "size-6 stroke-red-700 fill-red-700"
                  : "size-6 stroke-black",
              }}
              qKey="fellowPosts"
            />
            {post.likes.length > 0 && post.likes.length}
          </div>

          <div className="flex gap-1">
            <Repost
              postID={`${post._id}`}
              repost="api/fellowship-repost"
              reposted={{
                reposted: post.reposts?.includes(user)
                  ? "size-6 stroke-purple-500 stroke-2"
                  : "size-6 stroke-black stroke-2",
              }}
              qKey="fellowPosts"
            />
            {post.reposts.length > 0 && post.reposts.length}
          </div>

          <div className="flex gap-1">
            <SavePost
              postID={`${post._id}`}
              bookmark="api/fellowship-bookmark"
              booked={{
                booked: post?.bookmark.includes(user)
                  ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                  : "size-6 stroke-black stroke-2",
              }}
              qKey="fellowPosts"
            />
            {post?.bookmark.length > 0 && post?.bookmark.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FellowCard;
