import { useState, useEffect } from "react";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Allchurch() {
  const [branches, setBranches] = useState([]);
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  const user = localStorage.getItem("user");
  console.log(branches);

  useEffect(() => {
    api.get("api/churches-all").then((res) => setBranches(res.data));
  }, [toggle]);

  return (
    <div className="max-[500px]:pt-10">
      <h2 className="text-xl font-bold px-1 text-center">All Churches</h2>

      <SearchPage url="api/all-churches" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {branches &&
          branches.map((church) => (
            <div key={church._id} className="flex gap-3 px-4 py-3 ">
              <Avatar className="w-15 h-15 border rounded-full">
                <AvatarImage src={church?.userPhotoUrl} />
                <AvatarFallback>photo</AvatarFallback>
              </Avatar>

              <div className="w-full">
                <div className="flex justify-between flex-wrap">
                  <Link
                    to={`/view/church/${church._id}/post`}
                    className="text-lg font-medium"
                  >
                    {church.name}
                  </Link>
                  <div>
                    <FollowPage
                      pageId={`${church._id}`}
                      url="api/follow-church"
                      onToggle={Toggle}
                      followed={{
                        followed: church.followers?.includes(user)
                          ? "following"
                          : "follow",
                      }}
                    />
                  </div>
                </div>
                <Link
                  to={`/view/church/${church._id}/post`}
                  className="line-clamp-3"
                >
                  {church.bio}
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Allchurch;
