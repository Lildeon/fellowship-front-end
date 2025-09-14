import { Suspense, lazy } from "react";
import Comment from "@/component/Comment";
import LikePost from "@/component/LikePost";
import Repost from "@/component/Repost";
import SavePost from "@/component/SavePost";
import { Link, useParams } from "react-router";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { poster } from "@/component/poster";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const Fellowship = lazy(() => import("./ExploreFellow"));
const Testimony = lazy(() => import("@/component/GetTestimony"));

const ViewFellowPost = () => {
  const { id } = useParams();
  const user = localStorage.getItem("user");

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["fellowposts", id],
    queryFn: async () => {
      return api.get(`api/view-post/${id}`);
    },
  });

  return (
    <div className="flex gap-10 p-5 max-[500px]:mt-5">
      <div className="w-full">
        <div className="flex justify-center">{isPending && <Feedloader />}</div>
        <p>{isError && error.message}</p>
        <div>
          {data?.data && (
            <div key={data.data._id}>
              <div className="flex gap-3">
                <Link
                  to={`/fellowship/${data.data.fellowship?._id}/post`}
                  className="pb-3"
                >
                  <Avatar className="w-15 h-15 rounded-full">
                    <AvatarImage src={data.data.fellowship?.coverPhotoUrl} />
                    <AvatarFallback>photo</AvatarFallback>
                  </Avatar>
                </Link>
                <Link
                  to={`/fellowship/${data.data.fellowship?._id}/post`}
                  className="text-xl font-medium block"
                >
                  {data.data.fellowship?.name}
                </Link>
              </div>
              <div>
                {data.data?.imageUrl && (
                  <div className="overflow-hidden">
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
                      autoPlay
                      muted
                      poster={poster}
                      className="w-fit h-fit rounded-2xl"
                    >
                      <source src={data.data?.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
                {data.data?.content && <p>{data.data?.content}</p>}
              </div>
              <div className="py-2 text-lg">
                {new Date(data.data.createdAt).toUTCString().slice(5, -7)}
              </div>
              <div className="grid grid-cols-4 pt-3 gap-x-13 min-[500px]:gap-x-23">
                <div className="flex gap-1">
                  <Comment
                    postID={`${data.data._id}`}
                    url="api/fellowship-comment"
                    qKey="fellowposts"
                  />
                  {data.data.comments.length > 0 && data.data.comments.length}
                </div>

                <div className="flex gap-1">
                  <LikePost
                    postID={`${data.data._id}`}
                    like="api/fellowship-like"
                    liked={{
                      liked: data.data.likes?.includes(user)
                        ? "size-6 stroke-red-700 fill-red-700"
                        : "size-6 stroke-black",
                    }}
                    qKey="fellowposts"
                  />
                  {data.data.likes.length > 0 && data.data.likes.length}
                </div>

                <div className="flex gap-1">
                  <Repost
                    postID={`${data.data._id}`}
                    repost="api/fellowship-repost"
                    reposted={{
                      reposted: data.data.reposts?.includes(user)
                        ? "size-6 stroke-purple-500 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                    qKey="fellowposts"
                  />
                  {data.data.reposts.length > 0 && data.data.reposts.length}
                </div>
                <div className="flex gap-1">
                  <SavePost
                    postID={`${data.data._id}`}
                    bookmark="api/fellowship-bookmark"
                    booked={{
                      booked: data.data?.bookmark.includes(user)
                        ? "size-6 stroke-green-700 fill-green-700 stroke-2"
                        : "size-6 stroke-black stroke-2",
                    }}
                    qKey="fellowposts"
                  />
                  {data.data?.bookmark.length > 0 && data.data?.bookmark.length}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="pt-10 border-b">Comments</h1>
          {data?.data.comments.length > 0 &&
            data.data.comments.map((comment) => (
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
