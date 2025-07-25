import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "@/services/axios";

const UserAbout = () => {
  const params = useParams();
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get(`user-about/${params.id}`).then((res) => setAbout(res.data));
  }, [params.id]);
  return <div className="">{about}</div>;
};

export default UserAbout;
