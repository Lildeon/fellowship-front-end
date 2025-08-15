import { useParams } from "react-router";
import { useState, useEffect, Suspense, lazy } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import CommLayout from "@/component/Comlayout";
import Upload from "@/component/Upload";
import CreatePost from "@/component/CreatePost";
import EventForm from "@/component/EventForm";
import EditFellowship from "@/component/EditFellowship";
import Livestream from "@/component/Livestream";
import FellowPagemore from "@/component/FellowPagemore";
import PageOption from "@/component/PageOption";
import api from "@/services/axios";
import UserPhoto from "@/component/userPhoto";

const Testimony = lazy(() => import("@/component/GetTestimony"));

const FellowshipPage = () => {
  const params = useParams();
  const user = localStorage.getItem("user");
  const [fellowship, setFellowship] = useState({});

  useEffect(() => {
    api
      .get(`api/fellowship/${params.id}`)
      .then((res) => setFellowship(res.data));
  }, [params.id]);

  return (
    <>
      {(user === fellowship.user ||
        fellowship.admin?.find((admin) => admin._id === user)) && (
        <div className="flex gap-7">
          <div className="w-full">
            <div className="relative max-[500px]:mt-10 mb-20">
              <img
                src={fellowship?.coverPhotoUrl}
                alt="photo"
                className=" h-60 w-full"
              />
              <div className="absolute top-1 right-1">
                {user === fellowship.user && (
                  <PageOption
                    Id={`${params.id}`}
                    url="api/delete-fellowship"
                    navigate="communities/home"
                    admin="assign-admin-fellowship"
                    remove="remove-admin-fellowship"
                  />
                )}
              </div>
              <div className="flex gap-1 absolute left-2 top-45">
                <UserPhoto src={fellowship?.userPhotoUrl} />
                <div className="mt-18">
                  <Upload
                    userPhoto={`api/user-photo-fellowship/${params.id}`}
                    coverPhoto={`api/cover-photo-fellowship/${params.id}`}
                  />
                </div>
              </div>
              <div className="flex h-fit pt-2 gap-3 absolute right-1">
                <div className="hidden min-[500px]:inline">
                  <CreatePost Id={`${params.id}`} path="api/fellowship-post" />
                </div>

                {/* <Livestream /> */}

                <div className="hidden min-[500px]:inline">
                  <EventForm
                    Id={`${params.id}`}
                    eventpath="api/event-fellowship"
                  />
                </div>
                <div className="hidden min-[500px]:inline">
                  <EditFellowship fellowship={fellowship} Id={`${params.id}`} />
                </div>
                <div className="mr-1 min-[500px]:hidden">
                  <FellowPagemore
                    fellowship={fellowship}
                    Id={`${params.id}`}
                    path="api/fellowship-post"
                    eventpath="api/event-fellowship"
                  />
                </div>
              </div>
            </div>

            <div className="px-1">
              {fellowship && (
                <div key={fellowship._id} className="">
                  <h1 className="text-2xl font-medium">{fellowship.name}</h1>
                  <h2 className="font-medium">{fellowship.slogan}</h2>
                  <div className="flex gap-3 pt-2">
                    <Link to={`/community-followers/${fellowship._id}`}>
                      Followers
                    </Link>
                    <span>
                      {fellowship?.followers && fellowship.followers.length > 0
                        ? fellowship.followers.length
                        : null}
                    </span>

                    <span>
                      Joined:{" "}
                      {new Date(fellowship.createdAt)
                        .toUTCString()
                        .slice(7, -13)}
                    </span>
                  </div>
                  <div className="flex">
                    {fellowship?.admin.map((admin) => (
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
                  <div className="py-2">{fellowship.bio}</div>

                  <div className="pb-2 flex gap-x-5">
                    {fellowship.uniqueName} {fellowship.branch}
                    {"    "}
                    {fellowship.executive}
                  </div>

                  <Separator />
                  <CommLayout />
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:inline w-lg pt-1">
            <div className="flex flex-col gap-5 sticky top-0">
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

export default FellowshipPage;
