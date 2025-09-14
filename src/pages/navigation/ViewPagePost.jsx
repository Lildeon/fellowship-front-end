import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import { Suspense, lazy } from "react";
import { useParams, Link } from "react-router";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { poster } from "@/component/poster";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Branch = lazy(() => import("@/component/Explore"));

const ViewPagePost = () => {
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["pageposts", id],
    queryFn: async () => {
      return api.get(`page-post/${id}`);
    },
  });
  return (
    <div className="flex gap-7 pt-5 max-[500px]:pt-10">
      <div className="w-full">
        <div className="flex justify-center">{isPending && <Feedloader />}</div>
        <p>{isError && error.message}</p>
        <div>
          {data?.data && (
            <div className="px-5">
              <Link
                className="flex gap-2.5"
                to={
                  data.data.branch?._id
                    ? `/view/branch/${data.data.branch?._id}/post`
                    : `/view/church/${data.data.church?._id}/post`
                }
              >
                <Avatar className="border w-15 h-15 ">
                  <AvatarImage
                    src={
                      data.data.branch?.coverPhotoUrl ||
                      data.data.church?.userPhotoUrl
                    }
                  />
                  <AvatarFallback>photo</AvatarFallback>
                </Avatar>

                <div className="w-full">
                  <div>
                    <div className="text-lg min-[500px]:text-xl font-bold">
                      {data.data.branch?.name || data.data.church?.name}
                    </div>
                    <div className="flex justify-between">
                      <div>{data.data.branch?.tag}</div>

                      <div className="max-[500px]:hidden">
                        {data.data.branch?.branch}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div>
                {data.data?.imageUrl && (
                  <div className="overflow-hidden py-5">
                    <img
                      src={data.data?.imageUrl}
                      className="w-fit h-fit rounded-2xl"
                    />
                  </div>
                )}
                {data.data?.videoUrl && (
                  <div>
                    <video
                      controls
                      muted
                      autoPlay
                      poster={poster}
                      className="w-full h-full rounded-2xl"
                    >
                      <source src={data.data?.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
                {data.data?.content && <p>{data.data?.content}</p>}
              </div>
              <div className="py-2">
                {new Date(data.data.createdAt).toUTCString().slice(5, -7)}
              </div>
              <div className="flex justify-between py-3 border-y">
                <div className="flex gap-1">
                  <Comment
                    postID={`${data.data._id}`}
                    url="page-post/comment"
                    qKey="pageposts"
                  />
                  {data.data.comments.length > 0 && data.data.comments.length}
                </div>
                <div className="flex gap-1">
                  <LikePost
                    postID={`${id}`}
                    like="page-post-like"
                    liked={{
                      liked: data.data.likes?.includes(user)
                        ? "size-6 stroke-red-700 fill-red-700"
                        : "size-6 stroke-black",
                    }}
                    qKey="pageposts"
                  />
                  {data.data.likes.length > 0 && data.data.likes.length}
                </div>
                <div className="flex gap-1">
                  <Repost
                    postID={`${id}`}
                    repost="page-post-repost"
                    unrepost="page-post-unrepost"
                    reposted={{
                      reposted: data.data.reposts?.includes(user)
                        ? "size-6 stroke-purple-500 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                    qKey="pageposts"
                  />
                  {data.data.reposts.length > 0 && data.data.reposts.length}
                </div>
                <div className="flex gap-1">
                  <SavePost
                    postID={`${id}`}
                    bookmark="page-post-bookmark"
                    booked={{
                      booked: data.data?.bookmark.includes(user)
                        ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                    qKey="pageposts"
                  />
                  {data.data?.bookmark.length > 0 && data.data?.bookmark.length}
                </div>
              </div>
              <h1 className="pt-10 border-b">comments</h1>
              <div>
                {data.data &&
                  data.data.comments.map((comment) => (
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
