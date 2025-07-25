import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";

function ChurchPageBranches() {
  const [branches, setBranches] = useState([]);
  console.log(branches);
  const { id } = useParams();

  useEffect(() => {
    api.get(`api/branches/${id}`).then((res) => setBranches(res.data));
  }, [id]);

  return (
    <div>
      <SearchPage url="api/all-branches" />

      <div className="border-t">
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
                  className="h-15 w-15 rounded-full"
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
    </div>
  );
}

export default ChurchPageBranches;
