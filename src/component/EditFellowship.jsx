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

const EditFellowship = ({ fellowship }) => {
  const { id } = useParams();
  const fellowshipProfile = {
    name: fellowship.name,
    branch: fellowship.branch,
    uniqueName: fellowship.uniqueName,
    bio: fellowship.bio,
    about: fellowship.about,
    slogan: fellowship.slogan,
    executive: fellowship.executive,
  };
  const [branch, setBranch] = useState(fellowshipProfile);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) =>
    setBranch({ ...branch, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await api.put(`api/edit-fellowship/${id}`, branch);
    res.status === 201 ? navigate("/communities/explore") : setText(res.data);
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

      <DialogContent className="h-100 mt-10">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Community</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="touch-auto overflow-auto h-auto">
          <form
            action={handleSubmit}
            className="flex flex-col gap-5 max-w-md pt-5"
          >
            <label>Name of Fellowship</label>
            <input
              type="text"
              name="name"
              placeholder="Name of fellowship"
              onChange={(e) => handleChange(e)}
              autoCapitalize="on"
              defaultValue={`${fellowshipProfile.name}`}
            />

            <label>Branch</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="branch"
              placeholder="branch"
              defaultValue={`${fellowshipProfile.branch}`}
            />

            <label>Branch unique name</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="uniqueName"
              placeholder="Branch unique name"
              defaultValue={`${fellowshipProfile.uniqueName}`}
            />

            <label>bio</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="bio"
              placeholder="bio"
              defaultValue={`${fellowshipProfile.bio}`}
            />

            <label>About</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="about"
              placeholder="About fellowship"
              rows={5}
              defaultValue={`${fellowshipProfile.about}`}
            />

            <label>Fellowship slogan</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="slogan"
              placeholder="Fellowship slogan"
              defaultValue={`${fellowshipProfile.slogan}`}
            />

            <label>Fellowship Executives</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="executive"
              placeholder="Fellowship Executive"
              defaultValue={`${fellowshipProfile.executive}`}
            />
            <p className="text-red-700">{text}</p>
            <button type="submit" className="rounded-2xl bg-green-700 p-2">
              Save
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFellowship;
