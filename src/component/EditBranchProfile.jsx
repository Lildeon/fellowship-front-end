/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/axios";

const EditBranchProfile = ({ UserbranchProfile }) => {
  const { id } = useParams();

  const branchProfile = {
    name: UserbranchProfile.name,
    branch: UserbranchProfile.branch,
    pastor: UserbranchProfile.pastor,
    bio: UserbranchProfile.bio,
    tag: UserbranchProfile.tag,
    year: UserbranchProfile.year,
    about: UserbranchProfile.about,
    executive: UserbranchProfile.executive,
    exc2: UserbranchProfile.exc2,
    exc3: UserbranchProfile.exc3,
    exc4: UserbranchProfile.exc4,
    exc5: UserbranchProfile.exc5,
    picture: UserbranchProfile.picture,
  };
  const [branch, setBranch] = useState(branchProfile);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) =>
    setBranch({ ...branch, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = branch;
    const res = await api.put(`api/edit/branch-profile/${id}`, data);
    res.status === 201 ? navigate("/explore/branches") : setText(res.data);
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

      <DialogContent className="h-100 mt-10 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            Edit Branch Page
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="touch-auto overflow-auto h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-w-md pt-5"
          >
            <label>Name of Church </label>

            <input
              type="text"
              name="name"
              placeholder="Church name"
              onChange={(e) => handleChange(e)}
              defaultValue={branchProfile.name}
            />
            <label>Pastor</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="pastor"
              placeholder="Pastor in charge"
              defaultValue={branchProfile.pastor}
            />
            <label>Branch</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="branch"
              placeholder="branch"
              defaultValue={branchProfile.branch}
            />
            <label>bio</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="bio"
              placeholder="bio"
              defaultValue={branchProfile.bio}
              rows={5}
            />
            <label>Unique name</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="tag"
              placeholder="eg House of Prayers"
              defaultValue={branchProfile.tag}
            />
            <label>Year founded</label>
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              name="year"
              placeholder="year"
              defaultValue={branchProfile.year}
            />
            <label>About</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="about"
              placeholder="Brief history about church"
              rows={7}
              defaultValue={branchProfile.about}
            />

            <label>Executives</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="executive"
              placeholder="Executive"
              defaultValue={branchProfile.executive}
            />

            <p className="text-red-700">{text}</p>

            <button type="submit" className="bg-green-800 p-2 mt-5 rounded-3xl">
              Save
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBranchProfile;
