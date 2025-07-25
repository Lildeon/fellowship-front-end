import api from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BranchPageAbout = () => {
  const { id } = useParams();
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get(`api/branch-about/${id}`).then((res) => setAbout(res.data));
  }, [id]);
  return <div className="">{about}</div>;
};

export default BranchPageAbout;
