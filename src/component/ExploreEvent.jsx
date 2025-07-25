import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import api from "@/services/axios";

const ExploreEvent = () => {
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    api.get("events").then((res) => setEvents(res.data));
  }, []);
  return (
    <div>
      <Table className="">
        <TableBody>
          {events.length > 0 &&
            events.map((event) => (
              <TableRow key={event._id} className="">
                <TableCell>
                  <Link
                    to={`/event-view/${event._id}`}
                    className="line-clamp-1"
                  >
                    {event.eventName}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link to="/explore/events">More Event...</Link>
    </div>
  );
};

export default ExploreEvent;
