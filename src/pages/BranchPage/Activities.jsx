import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import api from "@/services/axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  console.log(activities);
  const { branch } = useParams();
  useEffect(() => {
    api
      .get(`api/branch-activity/${branch}`)
      .then((res) => setActivities(res.data));
  }, [branch]);
  return (
    <Table className="border-r">
      <TableBody className="">
        {activities.length > 0 ? (
          activities.map((event) => (
            <TableRow key={event._id} className="">
              <TableCell>
                <Link to={`/event-view/${event._id}`}>{event.eventName}</Link>
              </TableCell>
              <TableCell>{event.start}</TableCell>
              <TableCell>{event.end}</TableCell>
            </TableRow>
          ))
        ) : (
          <h1> No activities</h1>
        )}
      </TableBody>
    </Table>
  );
};

export default Activities;
