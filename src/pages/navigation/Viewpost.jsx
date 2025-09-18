import { Suspense, lazy } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { poster } from "@/component/poster";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const People = lazy(() => import("@/component/People"));

const Viewpost = () => {
  let params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", "view", params.id],
    queryFn: async () => {
      return api.get(`view/${params.id}`);
    },
  });

  return (
    <div className="flex gap-7 pt-5 max-[500px]:pt-10">
      <div className="w-full h-svh">
        <div className="flex justify-center">{isPending && <Feedloader />}</div>
        <p>{isError && error.message}</p>
        <div>
          {data?.data && (
            <div className="px-5">
              <div className="flex gap-2.5 pb-5">
                <Link
                  to={`/user/${data?.data.user?._id}/post`}
                  className="h-fit"
                >
                  <Avater src={data?.data.user?.userPhotoUrl} />
                </Link>
                <Link
                  to={`/user/${data?.data.user?._id}/post`}
                  className="text-lg font-medium"
                >
                  {data?.data.user?.username}
                </Link>
              </div>

              <div>
                {data?.data?.imageUrl && (
                  <img
                    src={data?.data?.imageUrl}
                    className="w-full h-full rounded-2xl"
                    loading="lazy"
                    alt="photo"
                  />
                )}
                {data?.data?.videoUrl && (
                  <video
                    controls
                    autoPlay
                    poster={poster}
                    muted
                    className="w-full h-100 rounded-2xl"
                  >
                    <source src={data?.data?.videoUrl} type="video/mp4" />
                  </video>
                )}
                <p>{data?.data?.content}</p>
              </div>

              <div className="pt-2">
                {new Date(data?.data.createdAt).toUTCString().slice(5, -7)}
              </div>

              <div className="flex justify-between py-3 mt-3 border-y">
                <div className="flex gap-1">
                  <Comment
                    postID={`${data?.data._id}`}
                    url="comment"
                    qKey="posts"
                  />
                  {data?.data.comments?.length > 0 &&
                    data?.data.comments?.length}
                </div>

                <div className="flex gap-1">
                  <LikePost post={data?.data} like="like" qKey="posts" />
                  {data?.data.likes?.length > 0 && data?.data.likes?.length}
                </div>

                <div className="flex gap-1">
                  <Repost post={data?.data} repost="repost" qKey="posts" />
                  {data?.data.reposts?.length > 0 && data?.data.reposts?.length}
                </div>

                <div className="flex gap-1">
                  <SavePost
                    post={data?.data}
                    bookmark="bookmark"
                    qKey="posts"
                  />
                  {data?.data?.bookmark?.length > 0 &&
                    data?.data?.bookmark?.length}
                </div>
              </div>
              <div>
                <h2 className="pt-10 border-b">Comments</h2>
              </div>
              <div>
                {data?.data &&
                  data?.data.comments?.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b py-3 flex gap-2.5"
                    >
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
