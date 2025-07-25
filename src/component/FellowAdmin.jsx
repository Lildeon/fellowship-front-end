import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

// eslint-disable-next-line react/prop-types
const FellowAdmin = ({ status }) => {
  const [pages, setPages] = useState([]);
  console.log(pages);

  useEffect(() => {
    api.get(`api/admin-pages`).then((res) => setPages(res.data));
  }, []);
  return (
    <div>
      {status === "user" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
            {pages.length > 0 &&
              pages.map((page) => (
                <div key={`${page._id}`}>
                  <Link to={`/my-page/${page._id}/post`}>
                    <p className="font-medium text-lg">{page.name}</p>

                    <img
                      src={page?.coverPhotoUrl}
                      alt="photo"
                      className="h-80  w-full rounded-2xl"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FellowAdmin;
