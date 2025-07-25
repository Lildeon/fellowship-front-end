import People from "@/component/People";
import Explore from "@/component/Explore";
import HomeLayout from "@/component/HomeLayout";
import { Suspense, lazy } from "react";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Testify = lazy(() => import("@/component/Testify"));
const ExploreF = lazy(() => import("../CommunityPage/ExploreFellow"));
const ExploreC = lazy(() => import("@/component/ExploreCh"));
const Search = lazy(() => import("@/component/Search"));

const FeedPage = () => {
  return (
    <div className="flex gap-7">
      <div className="w-full">
        <HomeLayout />
      </div>
      <div className="hidden lg:inline">
        <div className="flex flex-col gap-5 w-[350px]">
          <Suspense fallback={<p>Loading...</p>}>
            <Search />
            <Testify />
            <Testimony />
            <ExploreC />
            <Explore />
          </Suspense>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="sticky top-0 flex flex-col gap-5 pt-5">
            <People />
            <ExploreF />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default FeedPage;
