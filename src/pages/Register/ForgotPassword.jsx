import { useState } from "react";
import api from "@/services/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 m-auto max-w-sm">
      <h2 className="text-xl font-bold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <p>Click on the button below to request for a password reset link.</p>
        <button
          type="submit"
          className="border w-fit px-2 py-1 rounded-2xl self-center"
        >
          Send Reset Link
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
