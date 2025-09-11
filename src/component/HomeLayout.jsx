import { NavLink, Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div>
      <div className="flex z-10 bg-white min-[500px]:sticky top-0 border-b">
        <div className="text-lg grid grid-cols-2 w-full font-medium border-b border-b-white text-black border-x max-[500px]:border-hidden ">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive
                ? "border-b-4 border-gray-400 text-center pt-5 max-[500px]:pt-10 hover:bg-gray-50"
                : "text-center hover:bg-gray-100 pt-5 max-[500px]:pt-10"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/pages-posts"}
            className={({ isActive }) =>
              isActive
                ? "border-b-4 border-gray-400 text-center pt-5 max-[500px]:pt-10 hover:bg-gray-100"
                : "text-center pt-5 max-[500px]:pt-10 hover:bg-gray-100"
            }
          >
            Page
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default HomeLayout;
