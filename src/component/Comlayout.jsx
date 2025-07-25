import { NavLink, Outlet } from "react-router";

const CommLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="flex font-medium justify-around py-1 px-1 border-b border-r">
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
        {/* <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"members"}
        >
          Members
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

export default CommLayout;
