import Avater from "@/component/Avater";
import FollowPage from "@/component/FollowPage";
import { Feedloader } from "@/component/Loader";
import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const ExploreFellow = () => {
  const { data, status, error } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      return api.get("api/fellowship");
    },
  });

  if (status === "pending") {
    return (
      <div className="flex justify-center text-xl font-medium">
        <Feedloader />
      </div>
    );
  } else if (status === "error") {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="border rounded-2xl gap-5 flex flex-col p-3">
      <h1 className="text-xl font-bold">Explore Fellowships</h1>
      {data?.data.map((page) => (
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
              <FollowPage page={page} url="api/follow-fellowship" />
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
