import api from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AboutBranch = () => {
  const { branch } = useParams();
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get(`api/branch-about/${branch}`).then((res) => setAbout(res.data));
  }, [branch]);
  return <div className="">{about}</div>;
};

export default AboutBranch;
