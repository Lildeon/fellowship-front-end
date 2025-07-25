import Avater from "@/component/Avater";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Suspense, lazy } from "react";

const ExploreB = lazy(() => import("@/component/Explore"));
const ExploreC = lazy(() => import("@/component/ExploreCh"));
const ExploreF = lazy(() => import("./ExploreFellow"));

const FellowshipFollowers = () => {
  const [followers, setFollowers] = useState([]);
  console.log(followers);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`api/followers-fellowship/${id}`)
      .then((res) => setFollowers(res.data));
  }, [id]);
  return (
    <div className="flex gap-7">
      <div className="w-full border-t max-[500px]:mt-10">
        {followers.length > 0 &&
          followers.map((follower) => (
            <div
              key={follower._id}
              className="flex gap-2.5 border-b border-r px-4 py-3"
            >
              <Avater src={follower.userPhotoUrl} alt="photo" />
              <div>
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
          <ExploreF />
          <ExploreB />
          <ExploreC />
        </Suspense>
      </div>
    </div>
  );
};

export default FellowshipFollowers;
