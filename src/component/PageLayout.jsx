import { Link, Outlet } from "react-router";

const PageLayout = () => {
  return (
    <div>
      <div className="flex justify-around text-lg font-medium pb-5">
        <Link to={"/manage-page/church-page"}>Church</Link>
        <Link to={"/manage-page/branch-page"}>Branch</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PageLayout;
