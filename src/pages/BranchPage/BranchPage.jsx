import { useParams } from "react-router";
import { lazy, Suspense } from "react";
import BranchLayout from "@/component/BranchLayout";
import { Separator } from "@/components/ui/separator";
import EditBranchProfile from "@/component/EditBranchProfile";
import CreatePost from "@/component/CreatePost";
import EventForm from "@/component/EventForm";
import { Link } from "react-router";
import BranchPageMore from "@/component/BranchPageMore";
import Upload from "@/component/Upload";
import Livestream from "@/component/Livestream";
import PageOption from "@/component/PageOption";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "@/component/Loader";

const Testimony = lazy(() => import("@/component/GetTestimony"));

const BranchPage = () => {
  const params = useParams();

  const user = localStorage.getItem("user");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viewbranch", params.branch],
    queryFn: async () => {
      return api.get(`api/branch/${params.id}`);
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
            <div className="relative  max-[500px]:mt-10 mb-16">
              <img
                src={page?.coverPhotoUrl}
                alt="photo"
                className=" h-60 w-full"
              />

              <div className="absolute top-1 right-1">
                {user === page.user && (
                  <PageOption
                    Id={`${params.id}`}
                    url="api/delete-branch"
                    navigate="explore/branches"
                    admin="assign-admin-branch"
                    remove="remove-admin-branch"
                  />
                )}
              </div>
              <div className="flex left-2 top-45 absolute">
                <UserPhoto src={page?.userPhotoUrl} />
                <div className="h-fit mt-18">
                  <Upload
                    userPhoto={`api/user-photo-branch/${params.id}`}
                    coverPhoto={`api/cover-photo-branch/${params.id}`}
                  />
                </div>
              </div>
              <div className="flex justify-between absolute right-1">
                <div className="flex h-fit pt-2 gap-3">
                  <div className="hidden min-[500px]:inline">
                    <CreatePost Id={`${params.id}`} path="api/branch-post" />
                  </div>

                  {/* <Livestream /> */}

                  <div className="hidden min-[500px]:inline">
                    <EventForm
                      Id={`${params.id}`}
                      eventpath="api/event-branch"
                    />
                  </div>

                  <div className="hidden min-[500px]:inline">
                    <EditBranchProfile UserbranchProfile={page} />
                  </div>
                  <div className="min-[500px]:hidden mr-1">
                    <BranchPageMore
                      Id={`${params.id}`}
                      path="api/branch-post"
                      eventpath="api/event-branch"
                      UserbranchProfile={page}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1">
              <div key={page._id} className="">
                <h1 className="text-2xl font-bold text-gray-600 pt-3">
                  {page.name}
                </h1>
                <h2 className="text-xl text-gray-700 font-medium">
                  {page.tag}
                </h2>
                <div className="flex gap-3 py-2">
                  <Link
                    to={`/branch-followers/${params.id}`}
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
                </div>
                <div className="flex flex-wrap">
                  {page?.admin.map((admin) => (
                    <Link
                      to={`/user/${admin._id}/post`}
                      key={admin._id}
                      className="flex gap-2 text-lg font-medium hover:underline text-blue-700"
                    >
                      {/* <span>{admin.username}</span> */}
                      <span>{admin.email}</span>|
                    </Link>
                  ))}
                </div>
                <p>{page.bio}</p>
                <div className="flex flex-wrap gap-x-5 pt-2">
                  <p>{page.pastor}</p>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    {page.branch}
                  </div>
                  <p>{page.year}</p>
                </div>
                <div className="pb-2">Executives: {page.executive}</div>
                <Separator />
              </div>
            </div>

            <BranchLayout />
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

export default BranchPage;
