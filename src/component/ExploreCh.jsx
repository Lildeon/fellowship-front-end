import api from "@/services/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Avater from "./Avater";

function ExploreCh() {
  const [chuches, setChuches] = useState([]);

  useEffect(() => {
    api.get("api/churches").then((res) => setChuches(res.data));
  }, []);

  return (
    <div className="p-3 border rounded-2xl">
      <h2 className="text-xl font-bold pb-3">Explore Churches</h2>
      {chuches &&
        chuches.map((church) => (
          <div key={church._id}>
            <Link
              to={`/view/church/${church._id}/post`}
              className="flex gap-3 py-3"
            >
              <Avater src={church?.userPhotoUrl} alt="photo" />
              <p className="font-medium">{church.name}</p>
            </Link>
          </div>
        ))}
      <Link to={"/all-churches"}>more...</Link>
    </div>
  );
}

export default ExploreCh;
