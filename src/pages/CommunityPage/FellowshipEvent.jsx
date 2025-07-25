import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link, useParams } from "react-router";
import api from "@/services/axios";

const FellowshipEvent = () => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api.get(`api/fellowship-events/${id}`).then((res) => setEvents(res.data));
  }, [id]);
  return (
    <div className="w-full border-r">
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FellowshipEvent;
