import Avater from "@/component/Avater";
import EventComment from "@/component/EventComment";
import ExploreEvent from "@/component/ExploreEvent";
import LikeEvent from "@/component/LikeEvent";
import { defaultUserPhoto } from "@/component/poster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const ViewEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  const user = localStorage.getItem("user");
  console.log(event);
  useEffect(() => {
    api.get(`event/${id}`).then((res) => setEvent(res.data));
  }, [id, toggle]);
  return (
    <div className="w-full flex gap-7 max-[500px]:mt-5">
      <div className="w-full h-fit px-1">
        {event && (
          <div className="flex gap-3 px-5 py-3 rounded-2xl">
            <Link>
              <Avatar className="h-15 w-15 rounded-full">
                <AvatarImage
                  src={event.church?.userPhotoUrl || event.branch?.userPhotoUrl}
                />
                <AvatarFallback>
                  <img
                    src={defaultUserPhoto}
                    alt="photo"
                    className="h-15 w-15 rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className=" flex flex-col">
              <Link
                to={
                  event.branch?._id
                    ? `/view/branch/${event.branch?._id}/post`
                    : `/view/church/${event.church?._id}/post`
                }
                className="text-lg font-medium"
              >
                {event.church?.name || event.branch?.name}
              </Link>
              <div className="flex justify-between">
                <div>{event.branch?.tag}</div>
                <div>{event.branch?.branch}</div>
              </div>
              <div className="text-xl pt-5 font-bold">{event.eventName}</div>
              <div>{event.description}</div>
              <div className="flex gap-5">
                <div>Start: {event.start}</div>
                <div>End: {event.end}</div>
              </div>
              <div className="flex gap-10 pt-5">
                <div className="flex gap-1">
                  <EventComment eventId={`${id}`} url="comment-event" />
                  {event.comments.length > 0 && event.comments.length}
                </div>
                <div className="flex gap-1">
                  <LikeEvent
                    eventId={`${id}`}
                    like="event-like"
                    onToggle={Toggle}
                    liked={{
                      liked: event?.likes.find((id) => id === user)
                        ? "size-6 stroke-red-700 fill-red-700"
                        : "size-6 stroke-black",
                    }}
                  />
                  {event.likes.length > 0 && event.likes.length}
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <h1 className="border-b pt-10 px-1">Comments</h1>
          {event?.comments.length > 0 &&
            event.comments.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-2.5 border-b px-4 py-3"
              >
                <Link to={`/user/${comment.user._id}/post`} className="h-fit">
                  <Avater src={comment.user?.userPhotoUrl} />
                </Link>
                <div>
                  <Link
                    to={`/user/${comment.user._id}/post`}
                    className="font-medium"
                  >
                    {comment.user.username}
                  </Link>
                  <div>{comment.content}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="border rounded-2xl w-lg p-5 h-fit hidden lg:inline">
        <ExploreEvent />
      </div>
    </div>
  );
};

export default ViewEvent;
