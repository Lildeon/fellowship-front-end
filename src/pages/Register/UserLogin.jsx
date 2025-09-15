import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

const UserLogin = () => {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [server, setServer] = useState("");
  const [show, setShow] = useState(false);

  console.log(server);
  // const render = process.env.REACT_APP_API_URL

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { password, email };
    const res = await axios.post(`https://fellowship-backend.up.railway.app/login`, formData, {
      withCredentials: true,
    });

    if (res.status === 201) {
      localStorage.setItem("user", res.data._id);
      navigate("/home");
    }
    setServer(res.data.message);
  };

  return (
    <div className="h-svh flex flex-col justify-center max-w-xs min-[500px]:max-w-sm m-auto">
      <Card className="shrink">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Sign in here</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-h-full"
          >
            <label>Email</label>
            <input
              type="email"
              className="border p-1 rounded-2xl"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="email"
              required={true}
            />
            <label htmlFor="password"> Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className="border p-1 rounded-2xl w-full"
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                placeholder="password"
                required={true}
              />
              <span
                className="absolute top-3 right-3"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="p-1 rounded-2xl bg-green-800 text-white font-medium"
            >
              Submit
            </button>
            <Link
              className="hover:underline text-blue-700"
              to={"/forgot-password"}
            >
              Forgot Password
            </Link>
          </form>
          <p className="text-red-600 font-medium">{server}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default UserLogin;
