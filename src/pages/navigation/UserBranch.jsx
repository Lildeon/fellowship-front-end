import BranchAdmin from "@/component/BranchAdmin";
import api from "@/services/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";

// eslint-disable-next-line react/prop-types
function UserBranch({ status }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    api.get(`api/user-branches`).then((res) => setBranches(res.data));
  }, []);

  return (
    <div>
      <div>
        {status === "admin" && (
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
                    className="h-80 w-full rounded-2xl"
                  />
                  <p className="text-lg font-bold">{branch.name}</p>
                  <p className="">{branch.tag}</p>
                </Link>
              ))}
          </div>
        )}
      </div>
      <div>{status === "user" && <BranchAdmin />}</div>
    </div>
  );
}

export default UserBranch;
