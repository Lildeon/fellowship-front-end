import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import api from "@/services/axios";

const Allevent = () => {
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    api.get("all-event").then((res) => setEvents(res.data));
  }, []);
  return (
    <Table>
      <TableBody>
        {events.length > 0 &&
          events.map((event) => (
            <TableRow key={event._id} className="">
              <TableCell className="hidden lg:flex">
                <Link
                  to={
                    event.branch?._id
                      ? `/view/branch/${event.branch?._id}/post`
                      : `/view/church/${event.church?._id}/post`
                  }
                  className="line-clamp-1"
                >
                  {event.church?.name || event.branch?.tag}
                </Link>
              </TableCell>

              <TableCell>
                <Link to={`/event-view/${event._id}`} className="line-clamp-1">
                  {event.eventName}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-view/${event._id}`} className="line-clamp-1">
                  {event.start}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-view/${event._id}`} className="line-clamp-1">
                  {event.end}
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default Allevent;
