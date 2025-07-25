import { NavLink, Outlet } from "react-router";

const Layout = [
  { name: "Explore", path: "/communities/explore" },
  { name: "Home", path: "home" },
  { name: "Activites", path: "activities" },
  { name: "Create", path: "/create-community" },
];

const CommunityLayout = () => {
  return (
    <div>
      <div className="flex font-medium justify-around z-10 min-[500px]:text-lg py-1 min-[500px]:sticky top-0 mt-3 bg-white border-y border-r text-black">
        {Layout.map((layout) => (
          <NavLink
            to={`${layout.path}`}
            key={`${layout.name}`}
            className={({ isActive }) =>
              isActive ? "border-b-4 border-gray-400" : null
            }
          >
            {layout.name}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default CommunityLayout;
