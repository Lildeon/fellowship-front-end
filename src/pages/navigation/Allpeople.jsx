import { useState, useEffect } from "react";
import { Link } from "react-router";
import Follow from "@/component/Follow";
import Search from "@/component/Search";
import api from "@/services/axios";
import Avater from "@/component/Avater";

const Allpeople = () => {
  const [people, setPeople] = useState([]);
  console.log(people);
  const user = localStorage.getItem("user");

  const [toggle, setToggle] = useState(false);
  const Toggle = () => setToggle(!toggle);

  useEffect(() => {
    api.get("people-all").then((res) => setPeople(res.data));
  }, [toggle]);

  return (
    <div className="max-w-full max-[500px]:pt-10">
      <h1 className="font-bold text-xl px-1 text-center">People To Follow</h1>

      <Search />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
        {people.length > 0 &&
          people.map((pupil) => (
            <div key={pupil._id} className="flex gap-2.5 px-4 py-3">
              <Link to={`/user/${pupil._id}/post`} className="">
                <Avater src={pupil?.userPhotoUrl} />
              </Link>
              <div className="w-full">
                <div className="flex justify-between">
                  <Link to={`/user/${pupil._id}/post`} className="font-medium">
                    {pupil.username}
                  </Link>
                  <div>
                    {pupil._id !== user && (
                      <Follow
                        userId={`${pupil._id}`}
                        followed={{
                          followed: pupil?.follower.includes(user) ? (
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

                <p className="line-clamp-6">{pupil.bio}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Allpeople;
