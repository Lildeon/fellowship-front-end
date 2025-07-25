import Avater from "@/component/Avater";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const FollowingComm = () => {
  const [pages, setPages] = useState([]);
  const user = localStorage.getItem("user");

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get(`following-community`).then((res) => setPages(res.data));
  }, [toggle]);
  return (
    <div>
      {pages.length > 0 &&
        pages.map((page) => (
          <div key={page._id} className="flex gap-3 p-3 border-b border-r">
            <Avater src={page?.coverPhotoUrl} />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <Link
                  to={`/fellowship/${page._id}/post`}
                  className="font-medium"
                >
                  {page.name}
                </Link>
                <div className="">
                  <FollowPage
                    pageId={`${page._id}`}
                    url="api/follow-fellowship"
                    onToggle={Toggle}
                    followed={{
                      followed: page?.followers.find((id) => id === user)
                        ? "following"
                        : "follow",
                    }}
                  />
                </div>
              </div>
              <Link
                to={`/fellowship/${page._id}/post`}
                className="line-clamp-2"
              >
                {page.bio}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FollowingComm;
