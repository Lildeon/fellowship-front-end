/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/services/axios";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";

const PageOption = ({ Id, url, navigate, admin, remove }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 stroke-2 bg-white rounded-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex text-lg font-medium flex-col">
        <div>
          <NewAdmin admin={admin} Id={Id} />
        </div>
        <div>
          <RemoveAdmin remove={remove} Id={Id} />
        </div>
        <div>
          <DeletePage Id={Id} url={url} navigate={navigate} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PageOption;

export const DeletePage = ({ Id, url, navigate }) => {
  const redirect = useNavigate();
  const handleDelete = async () => {
    await api.delete(`${url}/${Id}`);
    redirect(`/${navigate}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p> Delete Page</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Page?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the page, this action cannot be undone.
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

export const NewAdmin = ({ admin, Id }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`${admin}/${Id}`, { email });
    setEmail("");
  };
  return (
    <Dialog>
      <DialogTrigger>Assign Admin</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Email Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            name="email"
            id=""
            className="w-full mr-5"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="border px-5 py-1 w-fit rounded-2xl">
            Add
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export const RemoveAdmin = ({ remove, Id }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`${remove}/${Id}`, {
      email,
    });
  };
  return (
    <Dialog>
      <DialogTrigger>Remove Admin</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>User Email Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            name="email"
            id=""
            className="w-full mr-5"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="border px-5 py-1 w-fit rounded-2xl">
            Remove
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
