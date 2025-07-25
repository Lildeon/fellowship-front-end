import api from "@/services/axios";
import { useEffect, useState } from "react";

const About = () => {
  const user = localStorage.getItem("user");
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get(`about`).then((res) => setAbout(res.data));
  }, [user]);
  return <div className="">{about}</div>;
};

export default About;
