import { useParams } from "react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import BranchLayout from "@/component/BranchLayout";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Branch = lazy(() => import("@/component/Explore"));

const ViewBranch = () => {
  const params = useParams();
  const user = localStorage.getItem("user");
  const [branch, setbranch] = useState({});
  console.log(branch);

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get(`api/branch/${params.branch}`).then((res) => setbranch(res.data));
  }, [params.branch, toggle]);

  return (
    <div className="flex gap-7">
      <div className="w-full">
        <div className="relative mb-20 max-[500px]:mt-10">
          <img
            src={branch?.coverPhotoUrl}
            alt="photo"
            className="h-60 w-full"
          />
          <div className="absolute left-2 top-45">
            <UserPhoto src={branch?.userPhotoUrl} />
          </div>
          <div className="pt-2 right-0 absolute">
            <FollowPage
              pageId={`${params.branch}`}
              url="api/follow-branch"
              onToggle={Toggle}
              followed={{
                followed: branch?.followers?.includes(user)
                  ? "following"
                  : "follow",
              }}
            />
          </div>
        </div>

        <div className="px-1">
          {branch && (
            <div key={branch._id} className="">
              <h1 className="text-2xl font-bold text-gray-600">
                {branch.name}
              </h1>
              <h2 className="text-xl font-medium text-gray-600">
                {branch.tag}
              </h2>
              <div className="flex gap-2 py-2">
                <Link to={`/branch-followers/${branch._id}`}>Followers</Link>
                <span>
                  {branch?.followers && branch.followers.length > 0
                    ? branch.followers.length
                    : null}
                </span>
                <span>
                  Created:{" "}
                  {new Date(branch.createdAt).toUTCString().slice(7, -13)}
                </span>
              </div>
              <p className="pb-2">{branch.bio}</p>

              <div className="flex flex-wrap gap-x-5">
                <p>{branch.pastor}</p>
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
                  {branch.branch}
                </div>
                <p>{branch.year}</p>
              </div>
              <p className="pb-2">Executives: {branch.executive}</p>
              <Separator />
            </div>
          )}
        </div>

        <BranchLayout />
      </div>
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
