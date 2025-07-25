import { NavLink, Outlet } from "react-router";
import Page from "./Page";

const ExploreLayout = () => {
  return (
    <div>
      <div className="flex justify-between min-[500px]:text-xl font-medium px-2 mb-5 border-b bg-white max-[500px]:pt-10">
        <NavLink
          to={"branches"}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Branches
        </NavLink>
        <NavLink
          to={"churches"}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Churches
        </NavLink>
        <NavLink
          to={"events"}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Events
        </NavLink>

        <Page />
      </div>

      <div className="px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default ExploreLayout;
