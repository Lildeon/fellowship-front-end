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
import api from "@/services/axios";

const UserLogin = () => {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [server, setServer] = useState("");
  const [show, setShow] = useState(false);

  console.log(server);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = { password, email };
    const res = await api.post("login", formData);

    if (res.status === 201) {
      localStorage.setItem("user", res.data._id);
      navigate("/home");
    }
    setServer(res.data.message);
  };

  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Sign in here</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={handleSubmit}
            className="flex flex-col gap-5 max-h-full "
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
          </form>
          <p className="text-red-600 font-medium">{server}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default UserLogin;
