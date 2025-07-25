import { useState, useEffect } from "react";
import { Link } from "react-router";
import FollowPage from "@/component/FollowPage";
import SearchPage from "@/component/SearchPage";
import api from "@/services/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Allbranch() {
  const [branches, setBranches] = useState([]);
  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);
  const user = localStorage.getItem("user");
  console.log(branches);

  useEffect(() => {
    api.get("api/branches-all").then((res) => setBranches(res.data));
  }, [toggle]);

  return (
    <div className="max-[500px]:pt-10">
      <h2 className="text-xl font-bold px-1 text-center">All Branches</h2>

      <SearchPage url="api/all-branches" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {branches &&
          branches.map((branch) => (
            <div key={branch._id} className="flex gap-3 px-4 py-3">
              <Avatar className="w-15 h-15 rounded-full border">
                <AvatarImage src={branch?.userPhotoUrl} />
                <AvatarFallback>photo</AvatarFallback>
              </Avatar>

              <div className="w-full">
                <div className="flex justify-between flex-wrap">
                  <Link
                    to={`/view/branch/${branch._id}/post`}
                    className="text-lg font-medium"
                  >
                    {branch.name}
                  </Link>
                  <FollowPage
                    pageId={`${branch._id}`}
                    url="api/follow-branch"
                    onToggle={Toggle}
                    followed={{
                      followed: branch.followers?.includes(user)
                        ? "following"
                        : "follow",
                    }}
                  />
                </div>
                <Link
                  to={`/view/branch/${branch._id}/post`}
                  className="flex gap-x-5 flex-wrap"
                >
                  <div>{branch.pastor}</div>
                  <div>{branch.tag}</div>
                  <div>{branch.branch}</div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Allbranch;
