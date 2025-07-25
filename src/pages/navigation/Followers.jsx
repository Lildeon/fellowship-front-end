import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Follow from "@/component/Follow";
import api from "@/services/axios";
import Avater from "@/component/Avater";

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const [toggle, setToggle] = useState(false);

  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get(`followers/${id}`).then((res) => setFollowers(res.data));
  }, [toggle, id]);

  return (
    <div>
      {followers.length > 0 &&
        followers.map((myfollowers) => (
          <div
            key={myfollowers._id}
            className="flex gap-2.5 border-b border-r px-4 py-3"
          >
            <Avater src={myfollowers?.userPhotoUrl} />

            <div className="w-full">
              <div className="flex justify-between">
                <Link
                  to={`/user/${myfollowers._id}/post`}
                  className="text-lg font-medium"
                >
                  {myfollowers.username}
                </Link>

                <div>
                  {myfollowers._id !== user && (
                    <Follow
                      userId={`${myfollowers._id}`}
                      followed={{
                        followed: myfollowers?.follower.includes(user) ? (
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
              <Link to={`/user/${myfollowers._id}/post`}>
                {myfollowers.bio}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Followers;
