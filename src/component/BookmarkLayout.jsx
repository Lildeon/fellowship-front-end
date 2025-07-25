import { NavLink, Outlet } from "react-router";
const BookmarkLayout = () => {
  return (
    <div>
      <div className="flex justify-around z-10 min-[500px]:sticky top-0 min-[500px]:text-lg font-medium border-b border-r bg-white max-[500px]:pt-10">
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"/bookmark"}
        >
          Bookmark
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"/favourite"}
        >
          Favourite
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"/pages"}
        >
          Pages
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
          to={"/community"}
        >
          Community
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default BookmarkLayout;
