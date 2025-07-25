import SearchComm from "@/component/SearchComm";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const CommunityExplore = () => {
  const [pages, setPages] = useState([]);
  console.log(pages);

  useEffect(() => {
    api.get("api/fellowship").then((res) => setPages(res.data));
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="pt-5">
        <SearchComm url="api/all-fellowships" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
        {pages.length > 0 &&
          pages.map((page) => (
            <Link to={`/fellowship/${page._id}/post`} key={`${page._id}`}>
              <img
                src={page?.coverPhotoUrl}
                alt="photo"
                className="w-full h-80 rounded-2xl"
              />
              <p className="text-lg font-bold">{page.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CommunityExplore;
