import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link, useParams } from "react-router";
import EventOption from "@/component/EventOption";
import api from "@/services/axios";

const FellowshipPageEvent = () => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const reload = () => setRefresh(!refresh);

  useEffect(() => {
    api.get(`api/fellowship-events/${id}`).then((res) => setEvents(res.data));
  }, [id, refresh]);
  return (
    <Table>
      <TableBody>
        {events.length > 0 &&
          events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>
                <Link to={`/view-event/${event._id}`}>{event.eventName}</Link>
              </TableCell>

              <TableCell>{event.start}</TableCell>
              <TableCell>{event.end}</TableCell>
              <TableCell>
                <EventOption
                  event={event}
                  url="api/edit-fellowship-event"
                  eventId={`${event._id}`}
                  urlDel="api/delete-fellowship-event"
                  onToggle={reload}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default FellowshipPageEvent;
