import { Link, Outlet } from "react-router";
import { Credential } from "@/context/context";
import { use } from "react";

const SettingsLayout = () => {
  const { logout } = use(Credential);
  return (
    <div className="flex">
      <div className="flex flex-col text-lg  font-medium border-r h-svh px-2 min-[500px]:px-5 max-[500px]:pt-10">
        <Link
          to={"/settings/account"}
          className={({ isActive }) =>
            isActive
              ? "border-b-4 border-gray-400 text-center pt-7 hover:bg-gray-100"
              : "text-center pt-7 hover:bg-gray-100"
          }
        >
          Account
        </Link>
        {/* <button
          className="flex gap-1 hover:underline w-fit rounded-3xl"
          onClick={logout}
        >
          <span className="hidden xl:inline text-lg  font-medium">Log-Out</span>
        </button> */}
        <Link
          to={"/settings/about"}
          className={({ isActive }) =>
            isActive
              ? "border-b-4 border-gray-400 text-center pt-7 hover:bg-gray-100"
              : "text-center pt-7 hover:bg-gray-100"
          }
        >
          About
        </Link>
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
