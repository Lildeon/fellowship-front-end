import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router";
import api from "@/services/axios";

const Activity = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("api/fellowship-events").then((res) => setEvents(res.data));
  }, []);
  return (
    <div className="w-full">
      <Table>
        <TableBody>
          {events.length > 0 &&
            events.map((event) => (
              <TableRow key={event._id}>
                <TableCell className="max-[600px]:hidden">
                  <Link to={`/fellowship/${event.fellowship._id}/post`}>
                    {event.fellowship.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/view-event/${event._id}`}
                    className="whitespace-normal"
                  >
                    {event.eventName}
                  </Link>
                </TableCell>
                <TableCell className="max-lg:hidden whitespace-normal">
                  <Link to={`/view-event/${event._id}`}>
                    {event.description}
                  </Link>
                </TableCell>
                <TableCell>{event.start}</TableCell>
                <TableCell>{event.end}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
