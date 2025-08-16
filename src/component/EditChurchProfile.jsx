/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { useState } from "react";
import { useParams } from "react-router";

import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/axios";

const EditChurchProfile = ({ UserchurchProfile }) => {
  let navigate = useNavigate();

  const { id } = useParams();

  const churchProfile = {
    name: UserchurchProfile.name,
    founders: UserchurchProfile.founders,
    year: UserchurchProfile.year,
    bio: UserchurchProfile.bio,
    about: UserchurchProfile.about,
    executive: UserchurchProfile.executive,
  };

  const [church, setChurch] = useState(churchProfile);
  const [text, setText] = useState("");
  console.log(churchProfile);
  const handleChange = (e) =>
    setChurch({ ...church, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.put(`api/edit/church-profile/${id}`, church);
    res.status === 201 ? navigate("/explore/churches") : setText(res.data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10 border rounded-xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </DialogTrigger>

      <DialogContent className={"h-100 mt-10 overflow-hidden"}>
        <DialogHeader>
          <DialogTitle className="text-lg text-center">
            Edit Church Page{" "}
          </DialogTitle>
          <DialogDescription> </DialogDescription>
        </DialogHeader>

        <div className="touch-auto overflow-auto h-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 h-fit">
            <label>Name of Church</label>
            <input
              type="text"
              name="name"
              placeholder="Church name"
              onChange={(e) => handleChange(e)}
              defaultValue={churchProfile.name}
              autoCapitalize="on"
              required={true}
            />
            <label>Founders</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="founders"
              placeholder="eg: Apostle Sam John Amedzro | Apostle Atipoe | Apostle Wuaku..."
              defaultValue={churchProfile.founders}
            />
            <label>Year</label>
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              name="year"
              placeholder="year"
              defaultValue={churchProfile.year}
            />
            <label>bio</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="bio"
              placeholder="eg: To bring people to know Jesus Christ and join His family, to build them to Christlike maturity and equip them through the Holy Spirit for ministry in the church and the world to the glory of God."
              defaultValue={churchProfile.bio}
            />
            <label>About</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="about"
              placeholder="Brief history about church"
              defaultValue={churchProfile.about}
              rows={5}
            />

            <label>Executive</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="executive"
              placeholder="eg: Apostle Erick Otoo(General Overseer) | Apostle Paul Sowu(General Secetary) | Apostle David Dzeble(Director for Misson)..."
              defaultValue={churchProfile.executive}
            />

            <p className="text-red-700">{text}</p>
            <button type="submit" className="bg-green-800 p-2 rounded-3xl mt-5">
              Save
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditChurchProfile;
