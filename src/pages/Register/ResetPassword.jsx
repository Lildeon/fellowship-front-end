import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "@/services/axios";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        newPassword,
      });
      res.status === 400 ? setMessage(res.data.message) : navigate("/sign-in");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-xs min-[500px]:max-w-sm m-auto">
      <h2 className="text-xl font-bold">Reset Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-5">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <button
          type="submit"
          className="border w-fit px-2 py-1 rounded-2xl self-center"
        >
          Reset Password
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
