import Avater from "@/component/Avater";
import api from "@/services/axios";
import { useEffect, useState, Suspense, lazy } from "react";
import { Link, useParams } from "react-router";

const ExploreB = lazy(() => import("../../component/Explore"));
const ExploreC = lazy(() => import("../../component/ExploreCh"));
const ExploreF = lazy(() => import("../../pages/CommunityPage/ExploreFellow"));

const ChurchFollowers = () => {
  const [followers, setFollowers] = useState([]);
  console.log(followers);
  const { id } = useParams();

  useEffect(() => {
    api.get(`api/followers-church/${id}`).then((res) => setFollowers(res.data));
  }, [id]);
  return (
    <div className="flex gap-7">
      <div className="border-t max-[500px]:mt-10 w-full">
        {followers.length > 0 &&
          followers.map((follower) => (
            <div
              key={follower._id}
              className="flex gap-2.5 border-b border-r px-4 py-3"
            >
              <Avater src={follower.userPhotoUrl} alt="photo" />
              <div className="w-full">
                <Link to={`/user/${follower._id}/post`} className="font-medium">
                  {follower.username}
                </Link>
                <div>{follower.bio}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-xl flex flex-col gap-5 max-[500px]:hidden">
        <Suspense fallback={<p>Loading...</p>}>
          <ExploreC />
          <ExploreB />
          <ExploreF />
        </Suspense>
      </div>
    </div>
  );
};

export default ChurchFollowers;
