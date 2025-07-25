import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreatePost from "./CreatePost";

import EventForm from "./EventForm";
import EditFellowship from "./EditFellowship";

// eslint-disable-next-line react/prop-types
const FellowPagemore = ({ fellowship, Id, path, eventpath }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10 border rounded-xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent className={"w-fit gap-y-3 flex gap-3"}>
        <CreatePost Id={Id} path={path} />
        <EventForm Id={Id} eventpath={eventpath} />
        <EditFellowship fellowship={fellowship} />
      </PopoverContent>
    </Popover>
  );
};

export default FellowPagemore;
