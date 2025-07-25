import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import EventOption from "@/component/EventOption";
import api from "@/services/axios";

const ChurchPageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const reload = () => setRefresh(!refresh);

  const { id } = useParams();
  useEffect(() => {
    api.get(`api/church-activity/${id}`).then((res) => setActivities(res.data));
  }, [id, refresh]);
  return (
    <Table className="w-full border-r">
      <TableBody className="">
        {activities.length > 0 &&
          activities.map((event) => (
            <TableRow key={event._id} className="">
              <TableCell>
                <Link to={`/event-view/${event._id}`} className="line-clamp-1">
                  {event.eventName}
                </Link>
              </TableCell>
              <TableCell>{event.start}</TableCell>
              <TableCell className="max-[500px]:hidden">{event.end}</TableCell>
              <TableCell>
                <EventOption
                  event={event}
                  url="api/edit-church-event"
                  eventId={`${event._id}`}
                  urlDel="api/delete-church-event"
                  onToggle={reload}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ChurchPageActivities;
