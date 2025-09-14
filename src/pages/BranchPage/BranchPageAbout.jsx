import { Feedloader } from "@/component/Loader";
import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const BranchPageAbout = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["about-branch", id],
    queryFn: async () => {
      return api.get(`api/branch-about/${id}`);
    },
  });
  return (
    <div className="">
      {isLoading && (
        <div className="flex justify-center">
          <Feedloader />
        </div>
      )}
      {isError && <p>{error.message}</p>}
      {data?.data && <p>{data.data}</p>}
    </div>
  );
};

export default BranchPageAbout;
