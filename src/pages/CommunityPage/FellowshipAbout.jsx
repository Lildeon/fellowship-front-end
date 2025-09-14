import { Feedloader } from "@/component/Loader";
import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const FellowshipAbout = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["about-fellowship", id],
    queryFn: async () => {
      return api.get(`api/about/${id}`);
    },
  });
  return (
    <div className="border-r">
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

export default FellowshipAbout;
