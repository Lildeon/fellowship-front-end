import { useState, useEffect } from "react";
import { Link } from "react-router";
import Follow from "./Follow";
import api from "@/services/axios";
import Avater from "./Avater";

const People = () => {
  const [people, setPeople] = useState([]);
  const [toggle, setToggle] = useState(false);
  console.log(people);
  const user = localStorage.getItem("user");

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    api.get(`people`).then((res) => setPeople(res.data));
  }, [user, toggle]);

  return (
    <div className="grid grid-cols-1 border rounded-2xl p-3 gap-x-5">
      <h3 className="font-bold text-xl pb-5">People To Follow</h3>
      {people.length > 0 &&
        people.map((pupil) => (
          <div key={pupil._id} className="py-2 flex justify-between">
            <Link
              to={`/user/${pupil._id}/post`}
              className="flex gap-3 items-center"
            >
              <Avater src={pupil.userPhotoUrl} alt="photo" />
              <div className="pb-5 text-lg font-medium">{pupil.username}</div>
            </Link>
            <div>
              {pupil._id !== user && (
                <Follow
                  userId={`${pupil._id}`}
                  followed={{
                    followed: pupil?.follower.find((id) => id === user) ? (
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
        ))}
      <Link to={"/all-people"}>more...</Link>
    </div>
  );
};

export default People;
