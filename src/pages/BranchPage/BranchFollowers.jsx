import Avater from "@/component/Avater";
import api from "@/services/axios";
import { useEffect, useState, Suspense, lazy } from "react";
import { Link, useParams } from "react-router";

const ExploreB = lazy(() => import("../../component/Explore"));
const ExploreC = lazy(() => import("../../component/ExploreCh"));
const ExploreF = lazy(() => import("../../pages/CommunityPage/ExploreFellow"));

const BranchFollowers = () => {
  const [followers, setFollowers] = useState([]);
  console.log(followers);
  const { id } = useParams();

  useEffect(() => {
    api.get(`api/followers-branch/${id}`).then((res) => setFollowers(res.data));
  }, [id]);
  return (
    <div className="flex gap-7">
      <div className="max-[500px]:mt-10 border-t w-full">
        {followers.length > 0 &&
          followers.map((follower) => (
            <div
              key={follower._id}
              className="flex gap-3 border-b border-r px-4 py-3"
            >
              <Avater src={follower.userPhotoUrl} alt="photo" />

              <Link to={`/user/${follower._id}/post`} className="w-full">
                <div className="font-medium">{follower.username}</div>
                <div>{follower.bio}</div>
              </Link>
            </div>
          ))}
      </div>
      <div className="w-xl flex flex-col gap-5 max-[500px]:hidden">
        <Suspense fallback={<p>Loading...</p>}>
          <ExploreB />
          <ExploreF />
          <ExploreC />
        </Suspense>
      </div>
    </div>
  );
};

export default BranchFollowers;
