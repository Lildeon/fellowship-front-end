import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import api from "@/services/axios";
import Avater from "@/component/Avater";

const Members = () => {
  const [members, setMembers] = useState([]);
  const { branch } = useParams();
  console.log(members);

  useEffect(() => {
    api.get(`api/members/${branch}`).then((res) => setMembers(res.data));
  }, [branch]);
  return (
    <div className="">
      {members.length > 0 &&
        members.map((member) => (
          <div
            key={member._id}
            className="flex gap-2.5 border-b border-r px-4 py-3"
          >
            <Link to={`/user/${member._id}/post`} className="h-fit">
              <Avater src={member?.userPhotoUrl} />
            </Link>

            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <Link to={`/user/${member._id}/post`} className="font-medium">
                  {member.username}
                </Link>

                <div className="flex flex-col">{member.branch}</div>
              </div>
              <Link to={`/user/${member._id}/post`}>{member.bio}</Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Members;
