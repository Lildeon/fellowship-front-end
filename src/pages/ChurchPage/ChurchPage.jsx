import { Link, useParams } from "react-router";
import { lazy, Suspense } from "react";
import ChurchLayout from "@/component/ChurchLayout";
import { Separator } from "@/components/ui/separator";
import CreatePost from "@/component/CreatePost";
import EditChurchProfile from "@/component/EditChurchProfile";
import EventForm from "@/component/EventForm";
import ChurchPageMore from "@/component/ChurchPageMore";
import Upload from "@/component/Upload";
import ChurchPageReview from "./ChurchPageReview";
import Livestream from "@/component/Livestream";
import PageOption from "@/component/PageOption";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";
import { Feedloader } from "@/component/Loader";
import { useQuery } from "@tanstack/react-query";

const Testimony = lazy(() => import("@/component/GetTestimony"));

const ChurchPage = () => {
  const params = useParams();
  const user = localStorage.getItem("user");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viewchurch", params.id],
    queryFn: async () => {
      return api.get(`api/church/${params.id}`);
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
    <>
      {(user === page.user ||
        page.admin?.find((admin) => admin._id === user)) && (
        <div className="flex gap-7">
          <div className="w-full">
            <div className="relative max-[500px]:mt-10 border mb-20">
              <img
                src={page?.coverPhotoUrl}
                className="h-60 w-full"
                alt="photo"
              />
              <div className="absolute top-1 right-1">
                {user === page.user && (
                  <PageOption
                    Id={`${params.id}`}
                    url="api/delete-church"
                    navigate="explore/churches"
                    admin="assign-admin-church"
                    remove="remove-admin-church"
                  />
                )}
              </div>
              <div className="flex absolute left-2 top-45">
                <UserPhoto src={page?.userPhotoUrl} />

                <div className="mt-18 h-fit">
                  <Upload
                    userPhoto={`api/user-photo-church/${params.id}`}
                    coverPhoto={`api/cover-photo-church/${params.id}`}
                  />
                </div>
              </div>
              <div className="flex justify-between absolute right-1">
                <div className="flex gap-3 h-fit pt-2 mr-1">
                  <div className="hidden min-[500px]:inline">
                    <CreatePost Id={`${params.id}`} path="api/church-post" />
                  </div>

                  {/* <Livestream /> */}

                  <div className="hidden min-[500px]:inline">
                    <EventForm
                      Id={`${params.id}`}
                      eventpath={"api/event-church"}
                    />
                  </div>
                  <div className="hidden min-[500px]:inline">
                    <EditChurchProfile UserchurchProfile={page} />
                  </div>
                  <div className="min-[500px]:hidden">
                    <ChurchPageMore
                      UserchurchProfile={page}
                      Id={`${params.id}`}
                      path="api/church-post"
                      eventpath={"api/event-church"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1">
              <div key={page._id}>
                <h1 className="text-2xl font-bold text-gray-600">
                  {page.name}
                </h1>
                <div className="flex gap-3 pb-2">
                  <Link
                    to={`/church-followers/${params.id}`}
                    className="hover:underline text-gray-600"
                  >
                    Followers
                  </Link>
                  <span>
                    {page?.followers && page.followers.length > 0
                      ? page.followers.length
                      : null}
                  </span>
                  <span>
                    Created:{" "}
                    {new Date(page.createdAt).toUTCString().slice(7, -13)}
                  </span>
                  <span>{page.year}</span>
                </div>
                <div className="flex">
                  {page?.admin.map((admin) => (
                    <Link
                      to={`/user/${admin._id}/post`}
                      key={admin._id}
                      className="flex gap-2 text-lg font-medium hover:underline text-blue-700"
                    >
                      <span>{admin.username}</span>
                      <span>{admin.email}</span> |
                    </Link>
                  ))}
                </div>
                <p>{page.bio}</p>
                <div className="pt-2">
                  <span className="font-medium">Founders: </span>
                  {page.founders}
                </div>
                <p className="">Executives: {page.executive}</p>
                <Separator />
              </div>
            </div>

            <ChurchLayout />
          </div>
          <div className="hidden lg:inline w-lg pt-1">
            <div className="flex flex-col sticky top-0">
              <Suspense fallback={<p>loading...</p>}>
                <Testimony />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChurchPage;
