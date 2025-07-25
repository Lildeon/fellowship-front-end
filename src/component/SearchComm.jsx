import api from "@/services/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Avater from "./Avater";

// eslint-disable-next-line react/prop-types
const SearchComm = ({ url }) => {
  const [pages, setPages] = useState([]);
  const [pagename, setPagename] = useState(null);

  console.log(pages);
  useEffect(() => {
    api.get(`${url}?pagename=${pagename}`).then((res) => setPages(res.data));
  }, [pagename, url]);
  return (
    <div className="max-w-md max-[500px]:static">
      <div className="flex gap-2 justify-between mt-2 relative max-[500px]:static">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 self-center absolute right-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          name=""
          className="w-full p-2 rounded-3xl "
          placeholder="Search"
          onChange={(e) => setPagename(e.target.value)}
        />
      </div>

      <div className="flex max-h-80 touch-auto overflow-auto flex-col absolute shadow-sm rounded-2xl bg-white w-[400px]">
        {pagename &&
          pages.map((page) => (
            <div key={page._id} className="py-3 px-4">
              <Link to={`/fellowship/${page._id}/post`} className="flex ">
                <Avater src={page?.coverPhotoUrl} />
                <div className="ml-2.5">
                  <div className="text-lg font-medium">{page.name}</div>
                  <div>{page.branch}</div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="pb-3">
        {pages.length > 4 && <Link>More Related...</Link>}
      </div>
    </div>
  );
};

export default SearchComm;
