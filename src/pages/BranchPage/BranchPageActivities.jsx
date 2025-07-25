import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import EventOption from "@/component/EventOption";
import api from "@/services/axios";

const BranchPageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const reload = () => setRefresh(!refresh);

  const { id } = useParams();
  useEffect(() => {
    api.get(`api/branch-activity/${id}`).then((res) => setActivities(res.data));
  }, [id, refresh]);
  return (
    <Table className="w-full">
      <TableBody className="border-r">
        {activities.length > 0 &&
          activities.map((event) => (
            <TableRow key={event._id} className="">
              <TableCell>
                <Link to={`/event-view/${event._id}`}>{event.eventName}</Link>
              </TableCell>
              <TableCell>{event.start}</TableCell>
              <TableCell>{event.end}</TableCell>
              <TableCell>
                <EventOption
                  event={event}
                  url="api/edit-branch-event"
                  eventId={`${event._id}`}
                  urlDel="api/delete-branch-event"
                  onToggle={reload}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default BranchPageActivities;
