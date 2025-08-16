/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { useState } from "react";

import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/axios";

const EditProfile = ({ myProfile }) => {
  let navigate = useNavigate();

  const userProfile = {
    fullname: myProfile.fullname,
    bio: myProfile.bio,
    about: myProfile.about,
    church: myProfile.church,
    location: myProfile.location,
    branch: myProfile.branch,
    uniqueId: myProfile.uniqueId,
    title: myProfile.title,
    language: myProfile.language,
    education: myProfile.education,
    nationality: myProfile.nationality,
    marry: myProfile.marry,
    job: myProfile.job,
  };
  const [profile, setProfile] = useState(userProfile);
  console.log(profile);
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`profile/edit`, profile);

    navigate("/profile/post");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 px-5 border rounded-3xl font-medium hover:bg-gray-200">
          Edit Profile
        </div>
      </DialogTrigger>

      <DialogContent className="h-100 mt-10 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="touch-auto overflow-auto h-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label htmlFor="fullname">Full name</label>
            <input
              type="text"
              name="fullname"
              onChange={(e) => handleChange(e)}
              defaultValue={myProfile.fullname}
            />
            <label>Bio</label>
            <textarea
              type="text"
              name="bio"
              placeholder="bio"
              onChange={(e) => handleChange(e)}
              defaultValue={myProfile.bio}
            />
            <label>About</label>
            <textarea
              type="text"
              name="about"
              placeholder="About you"
              rows={5}
              onChange={(e) => handleChange(e)}
              defaultValue={myProfile.about}
            />
            <label>Church</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="church"
              placeholder="Name of church"
              defaultValue={myProfile.church}
            />
            <label>Branch unique name</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="uniqueId"
              placeholder="Branch Unique Name"
              defaultValue={myProfile.uniqueId}
            />
            <label>Location</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="location"
              placeholder="location"
              defaultValue={myProfile.location}
            />
            <label>Branch</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="branch"
              placeholder="branch"
              defaultValue={myProfile.branch}
            />

            <label>Title</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="title"
              placeholder="title"
              defaultValue={myProfile.title}
            />
            <label>Language</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="language"
              placeholder="language"
              defaultValue={myProfile.language}
            />
            <label>Education</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="education"
              placeholder="education"
              defaultValue={myProfile.education}
            />
            <label>Nationality</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="nationality"
              placeholder="nationality"
              defaultValue={myProfile.nationality}
            />
            <label>Marital status</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="marry"
              placeholder="marital status"
              defaultValue={myProfile.marry}
            />
            <label>Job</label>
            <input
              type="text"
              name="job"
              placeholder="job"
              onChange={(e) => handleChange(e)}
              defaultValue={myProfile.job}
            />
            <button
              type="submit"
              className="border p-2 rounded-2xl mt-5 bg-green-800"
            >
              Save
            </button>
          </form>
        </div>

        <DialogDescription> </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
