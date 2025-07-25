import api from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const FellowshipAbout = () => {
  const { id } = useParams();
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get(`api/about/${id}`).then((res) => setAbout(res.data));
  }, [id]);
  return <div className="border-r">{about}</div>;
};

export default FellowshipAbout;
