import api from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AboutChurch = () => {
  const { church } = useParams();
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get(`api/church-about/${church}`).then((res) => setAbout(res.data));
  }, [church]);
  return <div className="">{about}</div>;
};

export default AboutChurch;
