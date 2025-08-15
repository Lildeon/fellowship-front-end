import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "@/services/axios";
import Avater from "./Avater";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(null);
  const handleSearch = useDebouncedCallback(
    (e) => setUsername(e.target.value),
    300,
  );

  useEffect(() => {
    api.get(`users?username=${username}`).then((res) => setUsers(res.data));
  }, [username]);

  return (
    <div className="max-w-md relative max-[500px]:static">
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
          className="w-full p-2 rounded-3xl"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>

      <div className="shadow-sm rounded-2xl flex flex-col w-full absolute bg-white touch-auto overflow-auto max-h-80">
        {username &&
          users.map((user) => (
            <div key={user._id} className="py-3 px-4">
              <Link to={`/user/${user._id}/post`} className="flex ">
                <Avater src={user?.userPhotoUrl} />
                <div className="ml-2.5">
                  <p className="text-lg font-medium">{user?.fullname}</p>
                  {user.username}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
