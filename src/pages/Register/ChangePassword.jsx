import api from "@/services/axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [notMatch, setNotMatch] = useState("");
  const [status, setStatus] = useState();
  console.log(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/confirm-password", { password });
    if (res.status === 201) {
      setStatus(res.status);
    } else {
      setText(res.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword && status === 201) {
      const res = api.put("/change-password", { newPassword });
      setText(res.data.message);
      setNewPassword("");
      setNewPassword("");
    } else {
      setNotMatch("Password does not match");
    }
  };
  return (
    <div className="max-[500px]:pt-10 px-1">
      <h1 className="font-bold">Change Password</h1>
      <div className="max-w-sm m-auto ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {status !== 201 && (
            <div className="relative flex flex-col gap-3">
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
                className="absolute top-11 right-3"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
              <p className="text-red-500">{text}</p>
              <button
                type="submit"
                className="bg-green-700 p-1 rounded-2xl w-fit px-4"
              >
                Submit
              </button>
            </div>
          )}
        </form>
        {status === 201 && (
          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-3">
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
                className="absolute top-11 right-3"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative flex flex-col gap-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={show ? "text" : "password"}
                className="border p-1 rounded-2xl w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                placeholder="Confirm new password here"
                required={true}
              />
              <span
                className="absolute top-11 right-3"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {notMatch.length > 0 && <p>{notMatch}</p>}
            <button
              type="submit"
              className="bg-green-700 p-1 rounded-2xl w-fit px-4"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
