import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import api from "@/services/axios";

const ChurchActivities = () => {
  const [activities, setActivities] = useState([]);
  console.log(activities);
  const { church } = useParams();
  useEffect(() => {
    api
      .get(`api/church-activity/${church}`)
      .then((res) => setActivities(res.data));
  }, [church]);
  return (
    <Table className="w-full border-r">
      <TableBody>
        {activities.length > 0 &&
          activities.map((event) => (
            <TableRow key={event._id} className="">
              <TableCell>
                <Link to={`/event-view/${event._id}`}>{event.eventName}</Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-view/${event._id}`}>{event.start}</Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-view/${event._id}`}>{event.end}</Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ChurchActivities;
