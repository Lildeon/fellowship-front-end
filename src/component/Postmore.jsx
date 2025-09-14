/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import Alertdialog from "./Alertdialog";
import api from "@/services/axios";

const Postmore = ({ postId, onToggle }) => {
  const handleFav = async () => {
    await api.post(`favourite/${postId}`);
    setTimeout(() => onToggle(), 1000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-fit gap-2 flex flex-col p-2"}>
        <div type="button" onClick={handleFav}>
          <Alertdialog />
        </div>
        <Link to={`/view/${postId}`}>View Post</Link>
      </PopoverContent>
    </Popover>
  );
};

export default Postmore;
