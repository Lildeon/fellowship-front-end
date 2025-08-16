import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Account = () => {
  return (
    <div className="flex flex-col  h-screen gap-10 p-2">
      {/* <div to={"/home"} className="text-2xl font-black">
        Fellowship
      </div> */}
      <img
        src={logo}
        alt="photo"
        className="h-50 w-50 rounded-full self-center"
      />
      <div className="flex flex-col gap-5 text-3xl font-bold bg-black rounded-2xl p-5 text-white w-full self-center">
        <Link
          to={"sign-up"}
          className="hover:text-green-600 hover:underline text-center"
        >
          Create Account
        </Link>
        <Link
          to={"https://fellowship-backend.onrender.com/sign-in"}
          className="hover:text-blue-500 hover:underline text-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Account;
