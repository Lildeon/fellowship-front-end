import { NavLink, Outlet } from "react-router";
import { useParams } from "react-router";

const FollowingLayout = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="flex justify-between px-1 min-[500px]:text-lg font-medium border-b border-r">
        <NavLink
          to={`/following/${id}`}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Following
        </NavLink>
        <NavLink
          to={`/followers/${id}`}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Followers
        </NavLink>
        <NavLink
          to={`/following-pages/${id}`}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Pages
        </NavLink>
        <NavLink
          to={`/following-communities/${id}`}
          className={({ isActive }) =>
            isActive ? "border-b-4 border-gray-400" : null
          }
        >
          Community
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default FollowingLayout;
