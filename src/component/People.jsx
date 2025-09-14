import { Link } from "react-router";
import Follow from "./Follow";
import api from "@/services/axios";
import Avater from "./Avater";
import { useQuery } from "@tanstack/react-query";
import { Feedloader } from "./Loader";

const People = () => {
  const user = localStorage.getItem("user");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      return api.get(`people`);
    },
  });
  if (isPending) {
    return <Feedloader />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="grid grid-cols-1 border rounded-2xl p-3 gap-x-5">
      <h3 className="font-bold text-xl pb-5">People To Follow</h3>
      <div>
        {data?.data &&
          data.data.map((pupil) => (
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
                      followed: pupil?.follower.includes(user) ? (
                        <p className="px-5 py-1 h-fit w-28 rounded-2xl border">
                          following
                        </p>
                      ) : (
                        <p className="px-5 py-1 h-fit w-28 rounded-2xl bg-black text-white">
                          follow
                        </p>
                      ),
                    }}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      <Link to={"/all-people"}>more...</Link>
    </div>
  );
};

export default People;
