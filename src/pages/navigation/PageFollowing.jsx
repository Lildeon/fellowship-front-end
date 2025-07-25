import Avater from "@/component/Avater";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const PageFollowing = () => {
  const [pages, setPages] = useState([]);
  console.log(pages);

  useEffect(() => {
    api.get(`following-pages`).then((res) => setPages(res.data));
  }, []);
  return (
    <div>
      {pages.length > 0 &&
        pages.map((page) => (
          <div
            key={page.church?._id || page.branch?._id}
            className="flex px-4 py-3 border-r border-b"
          >
            <div>
              <Avater
                src={page.church?.coverPhotoUrl || page.branch?.coverPhotoUrl}
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between">
                <Link
                  to={
                    page.branch?._id
                      ? `/view/branch/${page.branch?._id}/post`
                      : `/view/church/${page.church?._id}/post`
                  }
                  className="font-medium"
                >
                  {page.church?.name || page.branch?.tag}
                </Link>
              </div>
              <Link
                to={
                  page.branch?._id
                    ? `/view/branch/${page.branch?._id}/post`
                    : `/view/church/${page.church?._id}/post`
                }
                className="block"
              >
                {page.church?.bio || page.branch?.bio}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PageFollowing;
