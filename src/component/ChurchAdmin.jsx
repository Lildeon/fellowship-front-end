import { Link } from "react-router";
import { useState, useEffect } from "react";
import api from "@/services/axios";

const ChurchAdmin = () => {
  const [churches, setChurches] = useState([]);

  useEffect(() => {
    api.get(`api/admin-churches`).then((res) => setChurches(res.data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {churches.length > 0 &&
        churches.map((church) => (
          <Link
            to={`/church/${church._id}/post`}
            key={church._id}
            className="pb-5 block"
          >
            <img
              src={church?.coverPhotoUrl}
              alt="photo"
              className="h-80  w-full rounded-2xl"
            />
            <div className="text-lg font-bold">{church.name}</div>
            <div className="">{church.tag}</div>
          </Link>
        ))}
    </div>
  );
};

export default ChurchAdmin;
