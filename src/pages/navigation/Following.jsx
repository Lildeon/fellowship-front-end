import { Link, useParams } from "react-router";

import { useEffect, useState } from "react";
import Follow from "@/component/Follow";
import api from "@/services/axios";
import Avater from "@/component/Avater";

const Following = () => {
  const [following, setFolllowing] = useState([]);
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const [toggle, setToggle] = useState(false);

  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get(`following/${id}`).then((res) => setFolllowing(res.data));
  }, [toggle, id]);

  return (
    <div>
      {following.length > 0 &&
        following.map((myfollowing) => (
          <div
            key={myfollowing._id}
            className="flex gap-2.5 border-b border-r px-4 py-3"
          >
            <Avater src={myfollowing?.userPhotoUrl} />

            <div className="w-full">
              <div className="flex justify-between">
                <Link
                  to={`/user/${myfollowing._id}/post`}
                  className="text-lg font-medium"
                >
                  {myfollowing.username}
                </Link>

                <div>
                  {myfollowing._id !== user && (
                    <Follow
                      userId={`${myfollowing._id}`}
                      followed={{
                        followed: myfollowing?.follower.includes(user) ? (
                          <p
                            className="px-5 py-1 h-fit w-28
    rounded-2xl border"
                          >
                            following
                          </p>
                        ) : (
                          <p
                            className="px-5 py-1 h-fit w-28
    rounded-2xl bg-black text-white"
                          >
                            follow
                          </p>
                        ),
                      }}
                      onToggle={Toggle}
                    />
                  )}
                </div>
              </div>
              <Link to={`/user/${myfollowing._id}/post`}>
                {myfollowing.bio}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Following;
