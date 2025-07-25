import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Link } from "react-router";

function LinkMore() {
  return (
    <Popover>
      <PopoverTrigger>More</PopoverTrigger>
      <PopoverContent className="w-fit flex gap-x-5 p-1.5 flex-col">
        <Link to="community">Community</Link>
        <Link to="testimony">Testimony</Link>
      </PopoverContent>
    </Popover>
  );
}

export default LinkMore;
