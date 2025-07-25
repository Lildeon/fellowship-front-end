import FollowingLayout from "@/component/FollowingLayout";
import { Suspense, lazy } from "react";

const Branch = lazy(() => import("../../component/Explore"));
const People = lazy(() => import("../../component/People"));

const ExploreFollowing = () => {
  return (
    <div className="flex gap-7 max-[500px]:pt-10">
      <div className="w-full">
        <FollowingLayout />
      </div>
      <div className="hidden lg:inline w-xl">
        <Suspense fallback={<p>loading...</p>}>
          <div className="flex flex-col gap-5">
            <Branch />
            <People />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ExploreFollowing;
