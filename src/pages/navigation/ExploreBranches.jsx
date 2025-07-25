import { useState, useEffect } from "react";
import { Link } from "react-router";
import UserBranch from "./UserBranch";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";

const ExploreBranches = () => {
  const [branches, setBranches] = useState([]);
  const [toggle, setToggle] = useState(
    sessionStorage.getItem("customPages") || "",
  );

  useEffect(() => {
    sessionStorage.setItem("customPages", toggle);
    api.get("api/branches-all").then((res) => setBranches(res.data));
  }, [toggle]);
  return (
    <div>
      <div>
        <div className="flex max-[500px]:flex-col mb-3">
          <div className="grow">
            <SearchPage url="api/all-branches" />
          </div>
          <select
            className="rounded-2xl w-fit self-center p-3 border"
            onChange={(e) => setToggle(e.target.value)}
          >
            <option value="">Options</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <UserBranch status={toggle} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {branches &&
            branches.map((branch) => (
              <Link
                to={`/view/branch/${branch._id}/post`}
                key={branch._id}
                className="block"
              >
                <img
                  src={branch?.coverPhotoUrl}
                  alt="photo"
                  className="h-80 w-full rounded-2xl"
                />
                <p className="text-lg font-bold">{branch.name}</p>

                <div>{branch.tag}</div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreBranches;
