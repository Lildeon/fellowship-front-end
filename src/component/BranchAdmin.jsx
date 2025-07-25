import { Link } from "react-router";
import { useState, useEffect } from "react";
import api from "@/services/axios";

const BranchAdmin = () => {
  const [branches, setBranches] = useState([]);
  console.log(branches);
  useEffect(() => {
    api.get(`api/admin-branches`).then((res) => setBranches(res.data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {branches.length > 0 &&
        branches.map((branch) => (
          <Link
            to={`/branch/${branch._id}/post`}
            key={branch._id}
            className="pb-5 block"
          >
            <img
              src={branch?.coverPhotoUrl}
              alt="photo"
              className="h-80  w-full rounded-2xl"
            />
            <div className="text-lg font-bold">{branch.name}</div>
            <div className="">{branch.tag}</div>
          </Link>
        ))}
    </div>
  );
};

export default BranchAdmin;
