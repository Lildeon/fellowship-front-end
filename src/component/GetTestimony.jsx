import api from "@/services/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const GetTestimony = () => {
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    api.get("testimonies").then((res) => setTestimonies(res.data));
  }, []);
  return (
    <div className="border p-3 rounded-2xl h-100 overflow-auto">
      <h1 className="text-xl pb-5 font-bold">Testimony Stream</h1>
      {testimonies &&
        testimonies.map((testimony) => (
          <div key={testimony._id} className="leading-relaxed">
            {testimony.content}
          </div>
        ))}
      <Link to={"/all-testimony"}>more...</Link>
    </div>
  );
};

export default GetTestimony;
