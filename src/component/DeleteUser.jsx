import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/services/axios";
import { useNavigate } from "react-router";

const DeleteUser = () => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await api.delete("/delete-account");
    navigate("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="text-red-700">Delete Account</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction asChild>
          <button onClick={handleDelete}>Delete</button>
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
