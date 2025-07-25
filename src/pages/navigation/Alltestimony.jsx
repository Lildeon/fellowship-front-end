import api from "@/services/axios";
import { useState, useEffect } from "react";

const Alltestimony = () => {
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    api.get("testimonies-all").then((res) => setTestimonies(res.data));
  }, []);
  return (
    <div className="max-[500px]:pt-10">
      <h1 className="text-xl font-bold border-b px-1 text-center">
        Testimony Stream
      </h1>
      <div className="w-full">
        {testimonies &&
          testimonies.map((testimony) => (
            <p
              key={testimony._id}
              className="leading-relaxed border-b px-1 py-1"
            >
              {testimony.content}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Alltestimony;
