import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EventComment from "@/component/EventComment";
import LikeEvent from "@/component/LikeEvent";
import EventCard from "@/component/EventCard";
import api from "@/services/axios";
import Avater from "@/component/Avater";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { defaultUserPhoto } from "@/component/poster";

const ViewfellowEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  const user = localStorage.getItem("user");
  console.log(event);
  useEffect(() => {
    api.get(`api/view-event/${id}`).then((res) => setEvent(res.data));
  }, [id, toggle]);
  return (
    <div className="flex gap-7 max-[500px]:mt-5">
      <div className="w-full h-fit px-1">
        {event && (
          <div className="flex gap-3 p-5 rounded-2xl h-fit">
            <Link to={`/fellowship/${event.fellowship._id}/post`}>
              <Avatar className="h-15 w-15 rounded-full">
                <AvatarImage src={event.fellowship?.coverPhotoUrl} />
                <AvatarFallback>
                  <img
                    src={defaultUserPhoto}
                    alt="photo"
                    className="h-15 w-15 rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link to={`/fellowship/${event.fellowship._id}/post`}>
                <div className="text-lg font-semibold">
                  {event.fellowship.name}
                </div>
                <div>{event.fellowship.slogan}</div>
              </Link>
              <div className="text-xl font-bold pt-5">{event.eventName}</div>
              <div>{event.description}</div>
              <div className="flex gap-10">
                <div>{event.start}</div>
                <div>{event.end}</div>
              </div>
              <div className="flex gap-10 pt-5">
                <div className="flex gap-1">
                  <EventComment
                    eventId={`${id}`}
                    url="api/comment-event-fellowship"
                  />
                  {event.comments.length > 0 && event.comments.length}
                </div>
                <div className="flex gap-1">
                  <LikeEvent
                    eventId={`${id}`}
                    like="api/event-like-fellowship"
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
          <h1 className="border-b pt-10">Comments</h1>
          {event?.comments.length > 0 &&
            event.comments.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-2.5 border-b px-4 py-3"
              >
                <Link to={`/user/${comment.user._id}/post`} className="h-fit">
                  <Avater src={comment.user.userPhotoUrl} />
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

      <div className="border rounded-2xl w-lg hidden lg:inline p-5 h-fit">
        <EventCard />
      </div>
    </div>
  );
};

export default ViewfellowEvent;
