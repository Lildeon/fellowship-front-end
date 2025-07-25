import api from "@/services/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Avater from "./Avater";

function Explore() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    api.get("api/branches").then((res) => setBranches(res.data));
  }, []);

  return (
    <div
      className="p-3 border rounded-2xl
    "
    >
      <h2 className="text-xl font-bold pb-3">Explore Branches</h2>
      {branches &&
        branches.map((branch) => (
          <div key={branch._id}>
            <Link
              to={`/view/branch/${branch._id}/post`}
              className="flex gap-3 py-3"
            >
              <Avater src={branch?.coverPhotoUrl} alt="photo" />
              <div>
                <p className="font-medium line-clamp-1">{branch.name}</p>
                <p>{branch.tag}</p>
              </div>
            </Link>
          </div>
        ))}
      <Link to={"/all-branches"}>more...</Link>
    </div>
  );
}

export default Explore;
