import { useParams } from "react-router";
import { lazy, Suspense } from "react";
import BranchLayout from "@/component/BranchLayout";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Branch = lazy(() => import("@/component/Explore"));

const ViewBranch = () => {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viewbranch", params.branch],
    queryFn: async () => {
      return api.get(`api/branch/${params.branch}`);
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center text-xl font-medium">
        <Feedloader />
      </div>
    );
  } else if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex gap-7">
      {data?.data && (
        <div className="w-full">
          <div className="relative mb-20 max-[500px]:mt-10">
            <img
              src={data.data.coverPhotoUrl}
              alt="photo"
              className="h-60 w-full"
            />
            <div className="absolute left-2 top-45">
              <UserPhoto src={data.data.userPhotoUrl} />
            </div>
            <div className="pt-2 right-0 absolute">
              <FollowPage page={data.data} url="api/follow-branch" />
            </div>
          </div>

          <div className="px-1">
            <div key={data.data._id} className="">
              <h1 className="text-2xl font-bold text-gray-600">
                {data.data.name}
              </h1>
              <h2 className="text-xl font-medium text-gray-600">
                {data.data.tag}
              </h2>
              <div className="flex gap-2 py-2">
                <Link to={`/branch-followers/${data.data._id}`}>Followers</Link>
                <span>
                  {data.data.followers && data.data.followers.length > 0
                    ? data.data.followers.length
                    : null}
                </span>
                <span>
                  Created:{" "}
                  {new Date(data.data.createdAt).toUTCString().slice(7, -13)}
                </span>
              </div>
              <p className="pb-2">{data.data.bio}</p>

              <div className="flex flex-wrap gap-x-5">
                <p>{data.data.pastor}</p>
                <div className="flex">
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
                  {data.data.branch}
                </div>
                <p>{data.data.year}</p>
              </div>
              <p className="pb-2">Executives: {data.data.executive}</p>
              <Separator />
            </div>
          </div>

          <BranchLayout />
        </div>
      )}
      <div className="hidden lg:inline w-lg pt-1">
        <div className="flex flex-col gap-5 sticky top-0">
          <Suspense fallback={<p>loading...</p>}>
            <Testimony />
            <Branch />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ViewBranch;
