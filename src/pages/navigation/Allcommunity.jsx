import FollowPage from "@/component/FollowPage";
import SearchComm from "@/component/SearchComm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Allcommunity = () => {
  const [pages, setPages] = useState([]);
  const user = localStorage.getItem("user");
  console.log(pages);

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get("api/fellowship-all").then((res) => setPages(res.data));
  }, [toggle]);
  return (
    <div className="max-[500px]:pt-10">
      <h1 className="text-xl font-bold px-1 text-center">All Communities</h1>

      <SearchComm url="api/all-fellowships" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {pages.length > 0 &&
          pages.map((page) => (
            <div key={`${page._id}`} className="flex gap-3 px-4 py-3">
              <Avatar className="w-15 h-15 border rounded-full">
                <AvatarImage src={page?.coverPhotoUrl} />
                <AvatarFallback>photo</AvatarFallback>
              </Avatar>

              <div className="w-full">
                <div className="flex justify-between flex-wrap">
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
                        followed: page.followers?.includes(user)
                          ? "following"
                          : "follow",
                      }}
                    />
                  </div>
                </div>
                <p>{page.slogan}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Allcommunity;
