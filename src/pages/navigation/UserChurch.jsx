import { Link } from "react-router";
import { useState, useEffect } from "react";
import ChurchAdmin from "@/component/ChurchAdmin";
import api from "@/services/axios";

// eslint-disable-next-line react/prop-types
const UserChurch = ({ status }) => {
  const [churches, setChurches] = useState([]);

  useEffect(() => {
    api.get(`api/user-churches`).then((res) => setChurches(res.data));
  }, []);

  return (
    <div>
      <div>
        {status === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {churches.length > 0 &&
              churches.map((church) => (
                <Link
                  to={`/church/${church._id}/post`}
                  className="block"
                  key={church._id}
                >
                  <img
                    src={church?.coverPhotoUrl}
                    alt="photo"
                    className="h-80 w-full rounded-2xl"
                  />
                  <div className="text-lg font-bold">{church.name}</div>
                </Link>
              ))}
          </div>
        )}
      </div>
      <div>{status === "user" && <ChurchAdmin />}</div>
    </div>
  );
};

export default UserChurch;
