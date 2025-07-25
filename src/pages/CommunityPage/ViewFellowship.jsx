import { useParams } from "react-router";
import { useState, useEffect, Suspense, lazy } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import CommLayout from "@/component/Comlayout";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Fellowship = lazy(() => import("@/pages/CommunityPage/ExploreFellow"));

const ViewFellowship = () => {
  const params = useParams();
  const user = localStorage.getItem("user");
  const [fellowship, setFellowship] = useState();
  console.log(fellowship);

  const [toggle, setToggle] = useState(false);

  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api
      .get(`api/fellowship/${params.id}`)
      .then((res) => setFellowship(res.data));
  }, [params.id, toggle]);

  return (
    <div className="flex gap-7">
      <div className="w-full">
        <div className="relative max-[500px]:pt-10 border mb-20">
          <img
            src={fellowship?.coverPhotoUrl}
            alt="photo"
            className="h-60 w-full"
          />

          <div className="absolute left-2 top-45">
            <UserPhoto src={fellowship?.userPhotoUrl} />
          </div>
          <div className="pt-2 absolute right-1">
            <FollowPage
              pageId={`${params.id}`}
              url="api/follow-fellowship"
              onToggle={Toggle}
              followed={{
                followed: fellowship?.followers.includes(user)
                  ? "following"
                  : "follow",
              }}
            />
          </div>
        </div>

        <div className="px-1">
          {fellowship && (
            <div key={fellowship._id} className="">
              <h1 className="text-2xl font-bold text-gray-600">
                {fellowship.name}
              </h1>
              <h2 className="font-medium">{fellowship.slogan}</h2>
              <div className="flex gap-3 py-2">
                <Link to={`/community-followers/${fellowship._id}`}>
                  Followers
                </Link>
                <span>
                  {fellowship?.followers && fellowship.followers.length > 0
                    ? fellowship.followers.length
                    : null}
                </span>
                <span>
                  Joined:
                  {new Date(fellowship.createdAt).toUTCString().slice(7, -13)}
                </span>
              </div>

              <div className="pb-2 text-gray-700">{fellowship.bio}</div>

              <div className="flex  gap-x-3 gap-y-1">
                <div>{fellowship.uniqueName}</div>
                <div>{fellowship.branch}</div>
              </div>
              <div className="flex flex-wrap pb-2">
                {fellowship.executive && `Exexutives: ${fellowship.executive}`}
              </div>

              <Separator />
              <CommLayout />
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:inline w-lg pt-1">
        <div className="flex flex-col gap-5 sticky top-0">
          <Suspense fallback={<p>loading...</p>}>
            <Testimony />
            <Fellowship />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ViewFellowship;
