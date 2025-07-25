import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router";
import api from "@/services/axios";

const EventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("api/fellowship-events").then((res) => setEvents(res.data));
  }, []);
  return (
    <div className="border-t w-full">
      <Table>
        <TableBody>
          {events.length > 0 &&
            events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>
                  <Link to={`/view-event/${event._id}`}>{event.eventName}</Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link to="/communities/activities">More Event...</Link>
    </div>
  );
};

export default EventCard;
