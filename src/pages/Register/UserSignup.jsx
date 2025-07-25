import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserSignup = () => {
  const userProfile = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };
  const [profile, setProfile] = useState(userProfile);
  const [message, setMessage] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post(
      `http://localhost:8080/create-account`,
      profile,
    );

    if (res.status === 201) {
      navigate("/sign-in");
    }
    setMessage(res.data);
  };

  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">
            Register Here
          </CardTitle>
          <CardDescription>Create New Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-5">
            <label>Fullname</label>
            <input
              type="text"
              className="border p-1 rounded-2xl"
              onChange={(e) => handleChange(e)}
              name="fullname"
              placeholder="fullname eg Gideon Sowah"
            />
            <label>Username</label>
            <input
              type="text"
              className="border p-1 rounded-2xl"
              onChange={(e) => handleChange(e)}
              name="username"
              placeholder="eg Sowah9, Gideon_9"
              required={true}
            />
            <label>Email</label>
            <input
              type="email"
              className="border p-1 rounded-2xl"
              onChange={(e) => handleChange(e)}
              name="email"
              placeholder="email"
              required={true}
            />
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className="border p-1 rounded-2xl w-full"
                onChange={(e) => handleChange(e)}
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
            <button type="submit" className="bg-green-700 p-1 rounded-2xl ">
              Submit
            </button>
          </form>
          <p className="text-red-500">{message.message}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default UserSignup;
