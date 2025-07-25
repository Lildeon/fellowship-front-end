import { NavLink, Outlet } from "react-router";

const ChurchLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="flex font-medium py-2 justify-between border-b border-r px-1">
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"about"}
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"post"}
        >
          Post
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"branches"}
        >
          Branches
        </NavLink>
        {/* <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"affiliates"}
        >
          Affiliates
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"activities"}
        >
          Activities
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChurchLayout;
