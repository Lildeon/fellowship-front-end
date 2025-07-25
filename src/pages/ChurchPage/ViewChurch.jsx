import { useParams } from "react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import ChurchLayout from "@/component/ChurchLayout";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Church = lazy(() => import("@/component/ExploreCh"));

const ViewChurch = () => {
  const params = useParams();

  const [church, setChurch] = useState({});
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  const user = localStorage.getItem("user");

  useEffect(() => {
    api.get(`api/church/${params.church}`).then((res) => setChurch(res.data));
  }, [params.church, toggle]);

  return (
    <div className="flex gap-7">
      <div className="w-full">
        <div className="relative mb-18 max-[500px]:mt-10">
          <img
            src={church?.coverPhotoUrl}
            alt="photo"
            className="h-60 w-full"
          />
          <div className="absolute left-2 top-45">
            <UserPhoto src={church?.userPhotoUrl} />
          </div>
          <div className="pt-2 pr-1 absolute right-0">
            <FollowPage
              pageId={`${params.church}`}
              url="api/follow-church"
              onToggle={Toggle}
              followed={{
                followed: church.followers?.includes(user)
                  ? "following"
                  : "follow",
              }}
            />
          </div>
        </div>
        <div className="px-1">
          {church && (
            <div key={church._id} className="">
              <h1 className="text-2xl font-bold text-gray-600 py-2">
                {church.name}
              </h1>
              <div className="flex gap-2 pb-2">
                <Link to={`/church-followers/${church._id}`}>Followers</Link>
                <span>
                  {church?.followers && church.followers.length > 0
                    ? church.followers.length
                    : null}
                </span>
                <span>
                  Created:
                  {new Date(church.createdAt).toUTCString().slice(7, -13)}
                </span>
                <span>{church.year}</span>
              </div>
              <div className="pb-2">{church.bio}</div>

              <div>Founders: {church.founders}</div>
              <p className="py-2">Executives: {church.executive}</p>
              <Separator />
            </div>
          )}
        </div>

        <ChurchLayout />
      </div>
      <div className="hidden lg:inline w-lg pt-1">
        <div className="flex flex-col gap-5 sticky top-0">
          <Suspense fallback={<p>loading...</p>}>
            <Testimony />
            <Church />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ViewChurch;
