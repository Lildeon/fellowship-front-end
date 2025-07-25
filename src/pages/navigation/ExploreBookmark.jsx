import BookmarkLayout from "@/component/BookmarkLayout";
import { Suspense, lazy } from "react";

const Testimony = lazy(() => import("../../component/GetTestimony"));
const People = lazy(() => import("../../component/People"));

function ExploreBookmark() {
  return (
    <div className="flex gap-7">
      <div className="w-full">
        <BookmarkLayout />
      </div>
      <div className="hidden lg:inline w-xl">
        <Suspense fallback={<p>loading...</p>}>
          <div className="flex flex-col gap-5 ">
            <Testimony />
            <People />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default ExploreBookmark;
