import { useParams } from "react-router";
import { lazy, Suspense } from "react";
import ChurchLayout from "@/component/ChurchLayout";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";
import { Feedloader } from "@/component/Loader";
import { useQuery } from "@tanstack/react-query";

const Testimony = lazy(() => import("@/component/GetTestimony"));
const Church = lazy(() => import("@/component/ExploreCh"));

const ViewChurch = () => {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viewchurch", params.church],
    queryFn: async () => {
      return api.get(`api/church/${params.church}`);
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
      {page && (
        <div className="w-full">
          <div className="relative mb-18 max-[500px]:mt-10">
            <img
              src={page?.coverPhotoUrl}
              alt="photo"
              className="h-60 w-full"
            />
            <div className="absolute left-2 top-45">
              <UserPhoto src={page?.userPhotoUrl} />
            </div>
            <div className="pt-2 pr-1 absolute right-0">
              <FollowPage page={page} url="api/follow-church" />
            </div>
          </div>
          <div className="px-1">
            <div key={page._id} className="">
              <h1 className="text-2xl font-bold text-gray-600 py-2">
                {page.name}
              </h1>
              <div className="flex gap-2 pb-2">
                <Link to={`/church-followers/${page._id}`}>Followers</Link>
                <span>
                  {page?.followers && page.followers.length > 0
                    ? page.followers.length
                    : null}
                </span>
                <span>
                  Created:
                  {new Date(page.createdAt).toUTCString().slice(7, -13)}
                </span>
                <span>{page.year}</span>
              </div>
              <div className="pb-2">{page.bio}</div>

              <div>Founders: {page.founders}</div>
              <p className="py-2">Executives: {page.executive}</p>
              <Separator />
            </div>
          </div>

          <ChurchLayout />
        </div>
      )}
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
