import Avater from "@/component/Avater";
import ProfilePostMore from "@/component/ProfilePostMore";
import api from "@/services/axios";
import { useEffect, useState } from "react";

const Testimony = () => {
  const [testimonies, setTestimoies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const reload = () => setRefresh(!refresh);
  console.log(testimonies);
  useEffect(() => {
    api.get(`user-testimonies`).then((res) => setTestimoies(res.data));
  }, [refresh]);
  return (
    <div>
      {testimonies.length > 0 &&
        testimonies.map((testimony) => (
          <div
            key={`${testimony._id}`}
            className="px-4 py-3 flex gap-2.5 border-b border-r"
          >
            <Avater src={testimony.user.userPhotoUrl} />
            <div className="w-full flex flex-col">
              <div className="flex justify-between">
                <p className="font-medium">{testimony.user.username}</p>

                <ProfilePostMore
                  postId={`${testimony._id}`}
                  content={`${testimony.content}`}
                  url="edit-testimony"
                  urlDel="delete-testimony"
                  onReload={reload}
                />
              </div>
              <div>{testimony.content}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Testimony;
