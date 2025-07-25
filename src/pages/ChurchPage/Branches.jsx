import api from "@/services/axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

function Branches() {
  const [branches, setBranches] = useState([]);
  const { church } = useParams();

  useEffect(() => {
    api.get(`api/branches/${church}`).then((res) => setBranches(res.data));
  }, [church]);

  return (
    <div className="w-full">
      {branches &&
        branches.map((branch) => (
          <div
            key={branch._id}
            className="flex gap-2.5 px-4 py-3 border-b border-r w-full"
          >
            <Link to={`/view/branch/${branch._id}/post`}>
              <img
                src={branch?.userPhotoUrl}
                alt="photo"
                className="h-15 w-15 rounded-full border"
              />
            </Link>

            <Link to={`/view/branch/${branch._id}/post`}>
              <p className="font-medium text-lg">{branch.tag}</p>
              <p>{branch.pastor}</p>
              <p>{branch.branch}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Branches;
