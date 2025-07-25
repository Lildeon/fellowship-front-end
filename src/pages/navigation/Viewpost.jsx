import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const People = lazy(() => import("@/component/People"));

const Viewpost = () => {
  let params = useParams();

  const [view, setView] = useState({});
  const [toggle, setToggle] = useState(false);

  const Toggle = () => setToggle(!toggle);

  const user = localStorage.getItem("user");
  useEffect(() => {
    api.get(`view/${params.id}`).then((res) => setView(res.data));
  }, [params.id, toggle]);

  console.log(view);

  return (
    <div className="flex gap-7 pt-5 max-[500px]:pt-10">
      <div className="w-full h-svh">
        {view && (
          <div className="px-5">
            <div className="flex gap-2.5 pb-5">
              <Link to={`/user/${view.user?._id}/post`} className="h-fit">
                <Avater src={view.user?.userPhotoUrl} />
              </Link>
              <Link
                to={`/user/${view.user?._id}/post`}
                className="text-lg font-medium"
              >
                {view.user?.username}
              </Link>
            </div>

            <div>
              <p>{view.content}</p>
              {view?.imageUrl && (
                <img
                  src={view?.imageUrl}
                  className="w-full h-full rounded-2xl"
                  loading="lazy"
                  alt="photo"
                />
              )}
              {view?.videoUrl && (
                <video
                  controls
                  autoPlay
                  poster={poster}
                  muted
                  className="w-full h-100 rounded-2xl"
                >
                  <source src={view?.videoUrl} type="video/mp4" />
                </video>
              )}
            </div>

            <div className="pt-2">
              {new Date(view.createdAt).toUTCString().slice(5, -7)}
            </div>

            <div className="flex justify-between py-3 mt-3 border-y">
              <div className="flex gap-1">
                <Comment postID={`${view._id}`} url="comment" />
                {view.comments?.length > 0 && view.comments?.length}
              </div>

              <div className="flex gap-1">
                <LikePost
                  postID={`${view._id}`}
                  like="like"
                  unlike="unlike"
                  liked={{
                    liked: view.likes?.find((id) => id === user)
                      ? "size-6 stroke-red-700 fill-red-700"
                      : "size-6 stroke-black",
                  }}
                  onToggle={Toggle}
                />
                {view.likes?.length > 0 && view.likes?.length}
              </div>

              <div className="flex gap-1">
                <Repost
                  postID={`${view._id}`}
                  repost="repost"
                  unrepost="unrepost"
                  reposted={{
                    reposted: view.reposts?.find((id) => id === user)
                      ? "size-6 stroke-purple-500 stroke-2"
                      : "size-6 stroke-black stroke-2",
                  }}
                  onToggle={Toggle}
                />
                {view.reposts?.length > 0 && view.reposts?.length}
              </div>

              <div className="flex gap-1">
                <SavePost
                  postID={`${view._id}`}
                  bookmark="bookmark"
                  unbookmark="unbookmark"
                  onToggle={Toggle}
                  booked={{
                    booked: view.bookmark?.find((id) => id === user)
                      ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                      : "size-6 stroke-black stroke-2",
                  }}
                />
                {view?.bookmark?.length > 0 && view?.bookmark?.length}
              </div>
            </div>
            <div>
              <h2 className="pt-10 border-b">Comments</h2>
            </div>
            <div>
              {view &&
                view.comments?.map((comment) => (
                  <div key={comment._id} className="border-b py-3 flex gap-2.5">
                    <Link to={`/user/${comment.user._id}`} className="h-fit">
                      <img
                        src={comment.user?.userPhotoUrl}
                        alt="photo"
                        className="h-10 w-10 rounded-full"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link
                        to={`/user/${comment.user._id}/post`}
                        className="font-medium"
                      >
                        {comment.user.username}
                      </Link>
                      <div>{comment.content}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:inline">
        <div className="flex flex-col gap-5 w-sm">
          <Suspense fallback={<p>loading...</p>}>
            <Testimony />
            <People />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Viewpost;
