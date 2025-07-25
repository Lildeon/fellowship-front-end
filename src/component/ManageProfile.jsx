import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

const ManageProfile = () => {
  return (
    <div className="border px-2 w-fit rounded-lg mt-5">
      <DropdownMenu>
        <DropdownMenuTrigger>Manage Page</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Manage Pages</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link to={"/manage-profiles"}>Existing Pages</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ManageProfile;
