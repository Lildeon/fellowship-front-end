import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import api from "@/services/axios";
import Avater from "@/component/Avater";

const BranchPageMembers = () => {
  const [members, setMembers] = useState([]);
  const { id } = useParams();
  console.log(members);

  useEffect(() => {
    api.get(`api/members/${id}`).then((res) => setMembers(res.data));
  }, [id]);
  return (
    <div>
      {members.length > 0 &&
        members.map((member) => (
          <div key={member._id} className="flex gap-2.5 border-b border-r p-5">
            <Link to={`/user/${member._id}/post`} className="h-fit">
              <Avater src={member?.userPhotoUrl} />
            </Link>

            <div className="w-full">
              <div className="flex justify-between">
                <Link to={`/user/${member._id}/post`} className="font-medium">
                  {member.username}
                </Link>
                <div className="flex flex-col">{member.branch}</div>
              </div>
              <div>{member.bio}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BranchPageMembers;
