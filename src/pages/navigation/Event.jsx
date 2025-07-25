import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import api from "@/services/axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    api.get("all-event").then((res) => setEvents(res.data));
  }, []);
  return (
    <Table className="">
      <TableBody>
        {events.length > 0 &&
          events.map((event) => (
            <TableRow key={event._id} className="">
              <TableCell className="max-[600px]:hidden whitespace-normal">
                <Link
                  to={
                    event.branch?._id
                      ? `/view/branch/${event.branch?._id}/post`
                      : `/view/church/${event.church?._id}/post`
                  }
                  className=""
                >
                  {event.church?.name || event.branch?.tag}
                </Link>
              </TableCell>

              <TableCell>
                <Link
                  to={`/event-view/${event._id}`}
                  className="whitespace-normal"
                >
                  {event.eventName}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/event-view/${event._id}`}
                  className="max-lg:hidden whitespace-normal"
                >
                  {event.description}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-view/${event._id}`} className="">
                  {event.start}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-view/${event._id}`} className="">
                  {event.end}
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default Event;
