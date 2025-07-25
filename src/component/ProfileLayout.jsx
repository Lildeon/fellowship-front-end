import { NavLink, Outlet } from "react-router";
import LinkMore from "./LinkMore";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="">
        <div className="flex justify-between font-medium py-2  max-[500px]:touch-pan-x max-[500px]: overflow-auto text-gray-600 border-b border-r px-1">
          <NavLink
            to={"about"}
            className={({ isActive }) =>
              isActive ? "border-b-4 border-gray-400" : null
            }
          >
            About
          </NavLink>
          <NavLink
            to={"post"}
            className={({ isActive }) =>
              isActive ? "border-b-4 border-gray-400" : null
            }
          >
            Post
          </NavLink>
          <NavLink
            to={"repost"}
            className={({ isActive }) =>
              isActive ? "border-b-4 border-gray-400" : null
            }
          >
            Repost
          </NavLink>
          <NavLink
            to={"pages"}
            className={({ isActive }) =>
              isActive ? "border-b-4 border-gray-400" : null
            }
          >
            Page
          </NavLink>
          <NavLink
            to={"community"}
            className={({ isActive }) =>
              isActive
                ? "border-b-4 border-gray-400 max-[500px]:hidden"
                : "max-[500px]:hidden"
            }
          >
            Community
          </NavLink>
          <NavLink
            to={"testimony"}
            className={({ isActive }) =>
              isActive
                ? "border-b-4 border-gray-40 max-[500px]:hidden"
                : " max-[500px]:hidden"
            }
          >
            Testimony
          </NavLink>
          <div className="hidden max-[500px]:inline">
            <LinkMore />
          </div>
        </div>
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
