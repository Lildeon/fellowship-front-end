import { Link } from "react-router";
import { useState, useEffect } from "react";
import UserChurch from "./UserChurch";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";

function ExploreChurches() {
  const [churches, setChurches] = useState([]);
  const [toggle, setToggle] = useState(
    sessionStorage.getItem("customPages") || "",
  );

  useEffect(() => {
    sessionStorage.setItem("customPages", toggle);
    api.get("api/churches-all").then((res) => setChurches(res.data));
  }, [toggle]);
  return (
    <div>
      <div className="flex max-[500px]:flex-col mb-3">
        <div className="grow">
          <SearchPage url="api/all-churches" />
        </div>
        <select
          className="rounded-2xl w-fit h-fit self-center p-3 border"
          onChange={(e) => setToggle(e.target.value)}
        >
          <option value="">Options</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div>
        <UserChurch status={toggle} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {churches.length > 0 &&
          churches.map((church) => (
            <Link
              to={`/view/church/${church._id}/post`}
              key={church._id}
              className="mt-5 text-xl font-medium"
            >
              <img
                src={church?.coverPhotoUrl}
                alt="photo"
                className="w-full h-80 rounded-2xl"
              />
              <p className="text-lg font-bold">{church.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default ExploreChurches;
