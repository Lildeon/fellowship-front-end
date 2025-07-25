import { useState, useEffect, Suspense, lazy } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useParams } from "react-router";
import UserLayout from "@/component/UserLayout";
import Follow from "@/component/Follow";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";

const People = lazy(() => import("@/component/People"));

const ViewUser = () => {
  const [profile, setProfile] = useState({});
  const params = useParams();
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };

  console.log(profile);

  const user = localStorage.getItem("user");

  useEffect(() => {
    api.get(`user/profile/${params.id}`).then((res) => setProfile(res.data));
  }, [params.id, toggle]);
  return (
    <div className="flex gap-7">
      <div className="w-full">
        <div className="relative max-[500px]:pt-10 mb-20">
          <img
            src={profile?.coverPhotoUrl}
            alt="photo"
            className="w-full h-60 object-cover"
          />
          <div className="absolute left-2 top-45 max-[500px]:top-55">
            <UserPhoto src={profile?.userPhotoUrl} />
          </div>
          <div className="pt-2 right-1 absolute">
            {profile?._id !== user && (
              <Follow
                userId={`${params.id}`}
                followed={{
                  followed: profile.follower?.includes(user) ? (
                    <p
                      className="px-5 py-1 h-fit w-28
    rounded-2xl border"
                    >
                      following
                    </p>
                  ) : (
                    <p
                      className="px-5 py-1 h-fit w-28
    rounded-2xl bg-black text-white"
                    >
                      follow
                    </p>
                  ),
                }}
                onToggle={Toggle}
              />
            )}
          </div>
        </div>
        <div className="px-1">
          <div className={profile?.fullname ? "text-2xl font-bold" : null}>
            {profile?.fullname}
          </div>
          <div
            className={profile?.fullname ? "font-bold" : "text-2xl font-bold"}
          >
            {profile?.username}
          </div>
          <div className="flex flex-wrap gap-x-5">
            <Link to={`/following/${params.id}`}>
              Following{" "}
              {profile && profile.following?.length > 0
                ? profile.following?.length
                : null}
            </Link>
            <Link to={`/followers/${params.id}`}>
              Followers{" "}
              {profile && profile.follower?.length > 0
                ? profile.follower?.length
                : null}
            </Link>
            <span>
              Joined: {new Date(profile?.createdAt).toUTCString().slice(7, -13)}
            </span>
            <div className="flex">
              {profile?.location ? (
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
              {profile && profile.location}
            </div>
          </div>
          <p className="py-2 flex flex-wrap ">{profile && profile.bio}</p>

          <div className="flex flex-wrap gap-x-3 pb-2">
            <div className="flex">{profile && profile.church}</div>
            <div className="flex">{profile && profile?.uniqueId}</div>
            <div className="flex">
              {profile?.branch ? (
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
              {profile && profile.branch}
            </div>
            <div>{profile && profile.title}</div>
            <div>{profile && profile.language}</div>
            <div className="flex">
              {profile?.education ? (
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
              {profile && profile.education}
            </div>
            <p>{profile && profile.nationality}</p>
            <p>{profile && profile.marry}</p>
            <div className="flex">
              {profile?.job ? (
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
              {profile && profile.job}
            </div>
          </div>
        </div>
        <Separator />

        <UserLayout />
      </div>
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
