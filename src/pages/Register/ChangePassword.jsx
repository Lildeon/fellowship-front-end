import api from "@/services/axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  console.log(text);
  const handleSubmit = async () => {
    const res = await api.put("/change-password", { password, newPassword });
    setText(res.data.message);
    setNewPassword("");
    setNewPassword("");
  };
  return (
    <div className="max-w-sm m-auto max-[500px]:pt-10 px-1">
      <form action={handleSubmit} className="flex flex-col gap-7">
        <label className="text-lg">Change Password</label>
        <div className="relative">
          <label htmlFor="password">Current Password</label>
          <input
            type={show ? "text" : "password"}
            className="border p-1 rounded-2xl w-full"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter current password here"
            required={true}
          />
          <span
            className="absolute top-7 right-3"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="relative">
          <label htmlFor="newPassword">New Password</label>
          <input
            type={show ? "text" : "password"}
            className="border p-1 rounded-2xl w-full"
            onChange={(e) => setNewPassword(e.target.value)}
            name="newPassword"
            placeholder="Enter new password here"
            required={true}
          />
          <span
            className="absolute top-7 right-3"
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
    </div>
  );
};

export default ChangePassword;
