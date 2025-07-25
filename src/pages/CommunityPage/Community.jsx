import CommunityLayout from "@/component/CommunityLayout";
import FellowAdmin from "@/component/FellowAdmin";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Community = () => {
  const [pages, setPages] = useState([]);
  const [toggle, setToggle] = useState(
    sessionStorage.getItem("customPages") || "",
  );
  console.log(pages);

  useEffect(() => {
    sessionStorage.setItem("customPages", toggle);
    api.get(`api/user-pages`).then((res) => setPages(res.data));
  }, [toggle]);
  return (
    <div className="max-[500px]:pt-10 grow">
      <select
        className="rounded-2xl w-fit ml-1"
        onChange={(e) => setToggle(e.target.value)}
      >
        <option value="">Options</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <div>
        {toggle === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
            {pages.length > 0 &&
              pages.map((page) => (
                <div key={`${page._id}`}>
                  <Link to={`/my-page/${page._id}/post`}>
                    <p className="text-lg font-bold">{page.name}</p>

                    <img
                      src={page?.coverPhotoUrl}
                      alt="photo"
                      className="w-full h-80 rounded-2xl"
                    />
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
      <FellowAdmin status={toggle} />
      <div>
        <CommunityLayout />
      </div>
    </div>
  );
};

export default Community;
