import { Link } from "react-router";

const Catalogue = () => {
  return (
    <div>
      <div className="flex gap-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 self-center mb-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>

        <h1 className="text-2xl pt-2 font-medium pb-5">Create Page </h1>
      </div>
      <div className="flex gap-5">
        <Link to={"church-profile"} className="border rounded-md px-1">
          Create Church Profile
        </Link>
        <Link to={"branch-profile"} className="border rounded-md px-1">
          Create branch Profile
        </Link>
      </div>
    </div>
  );
};

export default Catalogue;
