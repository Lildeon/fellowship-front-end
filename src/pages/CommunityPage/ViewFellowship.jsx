import { useParams } from "react-router";
import { Suspense, lazy } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import CommLayout from "@/component/Comlayout";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";
import { Feedloader } from "@/component/Loader";
import { useQuery } from "@tanstack/react-query";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Fellowship = lazy(() => import("@/pages/CommunityPage/ExploreFellow"));

const ViewFellowship = () => {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viewcommunity", params.id],
    queryFn: async () => {
      return api.get(`api/fellowship/${params.id}`);
    },
  });
  const page = data?.data;
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
      <div className="w-full">
        <div className="relative max-[500px]:pt-10 border mb-20">
          <img src={page?.coverPhotoUrl} alt="photo" className="h-60 w-full" />

          <div className="absolute left-2 top-45">
            <UserPhoto src={page?.userPhotoUrl} />
          </div>
          <div className="pt-2 absolute right-1">
            <FollowPage page={page} url="api/follow-fellowship" />
          </div>
        </div>

        <div className="px-1">
          <div key={page._id} className="">
            <h1 className="text-2xl font-bold text-gray-600">{page.name}</h1>
            <h2 className="font-medium">{page.slogan}</h2>
            <div className="flex gap-3 py-2">
              <Link to={`/community-followers/${page._id}`}>Followers</Link>
              <span>
                {page?.followers && page.followers.length > 0
                  ? page.followers.length
                  : null}
              </span>
              <span>
                Joined:
                {new Date(page.createdAt).toUTCString().slice(7, -13)}
              </span>
            </div>

            <div className="pb-2 text-gray-700">{page.bio}</div>

            <div className="flex  gap-x-3 gap-y-1">
              <div>{page.uniqueName}</div>
              <div>{page.branch}</div>
            </div>
            <div className="flex flex-wrap pb-2">
              {page.executive && `Exexutives: ${page.executive}`}
            </div>

            <Separator />
            <CommLayout />
          </div>
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
