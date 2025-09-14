import { Suspense, lazy } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useParams } from "react-router";
import UserLayout from "@/component/UserLayout";
import Follow from "@/component/Follow";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const People = lazy(() => import("@/component/People"));

const ViewUser = () => {
  const params = useParams();
  const user = localStorage.getItem("user");
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["userprofile", params.id],
    queryFn: async () => {
      return api.get(`user/profile/${params.id}`);
    },
  });
  if (isPending) {
    return <Feedloader />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex gap-7">
      {data?.data && (
        <div className="w-full">
          <div className="relative max-[500px]:pt-10 mb-20">
            <img
              src={data.data.coverPhotoUrl}
              alt="photo"
              className="w-full h-60 object-cover"
            />
            <div className="absolute left-2 top-45 max-[500px]:top-55">
              <UserPhoto src={data.data.userPhotoUrl} />
            </div>
            <div className="pt-2 right-1 absolute">
              {data.data._id !== user && (
                <Follow
                  userId={`${params.id}`}
                  followed={{
                    followed: data.data.follower?.includes(user) ? (
                      <p className="px-5 py-1 h-fit w-28 rounded-2xl border">
                        following
                      </p>
                    ) : (
                      <p className="px-5 py-1 h-fit w-28 rounded-2xl bg-black text-white">
                        follow
                      </p>
                    ),
                  }}
                />
              )}
            </div>
          </div>
          <div className="px-1">
            <div className={data.data.fullname ? "text-2xl font-bold" : null}>
              {data.data.fullname}
            </div>
            <div
              className={
                data.data.fullname ? "font-bold" : "text-2xl font-bold"
              }
            >
              {data.data.username}
            </div>
            <div className="flex flex-wrap gap-x-5">
              <Link to={`/following/${params.id}`}>
                {data.data.following?.length > 0
                  ? data.data.following?.length
                  : null}{" "}
                Following
              </Link>
              <Link to={`/followers/${params.id}`}>
                {data.data.follower?.length > 0
                  ? data.data.follower?.length
                  : null}{" "}
                Followers
              </Link>
              <span>
                Joined:{" "}
                {new Date(data.data.createdAt).toUTCString().slice(7, -13)}
              </span>
              <div className="flex">
                {data.data.location ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                ) : null}
                {data.data.location}
              </div>
            </div>
            <p className="py-2 flex flex-wrap ">{data.data.bio}</p>

            <div className="flex flex-wrap gap-x-3 pb-2">
              <div className="flex">{data.data.church}</div>
              <div className="flex">{data.data.uniqueId}</div>
              <div className="flex">
                {data.data.branch ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                ) : null}
                {data.data.branch}
              </div>
              <div>{data.data.title}</div>
              <div>{data.data.language}</div>
              <div className="flex">
                {data.data.education ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                ) : null}
                {data.data.education}
              </div>
              <p>{data.data.nationality}</p>
              <p>{data.data.marry}</p>
              <div className="flex">
                {data.data.job ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                ) : null}
                {data.data.job}
              </div>
            </div>
          </div>
          <Separator />

          <UserLayout />
        </div>
      )}
      <div className="w-lg hidden lg:inline">
        <Suspense fallback={<p>loading...</p>}>
          <div className="sticky top-0">
            <People />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ViewUser;
