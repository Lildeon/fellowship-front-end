import Avater from "@/component/Avater";
import FollowPage from "@/component/FollowPage";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const ExploreFellow = () => {
  const [pages, setPages] = useState([]);
  const user = localStorage.getItem("user");
  console.log(pages);
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get("api/fellowship").then((res) => setPages(res.data));
  }, [toggle]);
  return (
    <div className="border rounded-2xl gap-5 flex flex-col p-3">
      <h1 className="text-xl font-bold">Explore Fellowships</h1>
      {pages.length > 0 &&
        pages.map((page) => (
          <div key={`${page._id}`} className="flex gap-3">
            <Avater src={page?.coverPhotoUrl} alt="photo" />
            <div>
              <Link
                to={`/fellowship/${page._id}/post`}
                className="font-medium text-lg"
              >
                {page.name}
              </Link>
              <div>
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
          </div>
        ))}
      <Link className="" to={"all-communities"}>
        more...
      </Link>
    </div>
  );
};

export default ExploreFellow;
