import { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "@/services/axios";

const SetPassword = () => {
  const userProfile = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };
  const [profile, setProfile] = useState(userProfile);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  console.log(profile);
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await api.put(`update-credential`, profile);
    if (res.status === 201) {
      navigate("/settings/about");
    }
    setText(res.data);
  };

  const confirm = async () => {
    const res = await api.post(`verify-password`, {
      password,
    });
    if (res.status === 201) {
      setProfile(res.data);
      setStatus(res.status);
      setMessage("");
    } else if (res.status === 200) {
      setMessage(res.data);
    }
  };

  return (
    <div className="h-svh max-[500px]:pt-10 px-2">
      <h1 className="font-medium">Update User</h1>

      <form
        action={confirm}
        className="flex flex-col gap-5 max-w-sm m-auto pb-5"
      >
        <label htmlFor="confirm">Current Password</label>
        <div className="relative">
          <input
            id="confirm"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type password here"
            className="w-full"
          />

          <span
            className="absolute top-3  right-3"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="text-red-500">{message}</p>
        <button
          type="submit"
          className="bg-green-700 p-1 px-4 rounded-2xl w-fit"
        >
          Confirm
        </button>
      </form>
      {status === 201 && (
        <form
          action={handleSubmit}
          className="flex flex-col gap-5 max-w-sm m-auto"
        >
          <label>Fullname</label>
          <input
            type="text"
            className="border p-1 rounded-2xl"
            onChange={(e) => handleChange(e)}
            name="fullname"
            placeholder="fullname eg Gideon Sowah"
            defaultValue={profile?.fullname}
          />
          <label>Username</label>
          <input
            type="text"
            className="border p-1 rounded-2xl"
            onChange={(e) => handleChange(e)}
            name="username"
            placeholder="eg Sowah9, Gideon_9"
            required={true}
            defaultValue={profile?.username}
          />
          <label>Email</label>
          <input
            type="email"
            className="border p-1 rounded-2xl"
            onChange={(e) => handleChange(e)}
            name="email"
            placeholder="email"
            required={true}
            defaultValue={profile?.email}
          />
          <label htmlFor="password"> Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="border p-1 rounded-2xl w-full"
              onChange={(e) => handleChange(e)}
              name="password"
              placeholder="password"
              required={true}
              defaultValue={profile?.password}
            />
            <span
              className="absolute top-3 right-3"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className="text-red-500">{text}</p>
          <button
            type="submit"
            className="bg-green-700 p-1 rounded-2xl w-fit px-4"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SetPassword;
