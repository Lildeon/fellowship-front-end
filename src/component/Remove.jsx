/* eslint-disable react/prop-types */

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import api from "@/services/axios";

const Remove = ({ postID, onToggle }) => {
  const handleRemove = async () => {
    await api.post(`unfavourite/${postID}`);
    setTimeout(() => onToggle(), 1000);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <button
          type="button"
          className="hover:bg-yellow-400 hover:border-yellow-400 border px-5 rounded-2xl py-1"
          onClick={handleRemove}
        >
          Remove
        </button>
      </DialogTrigger>
      <DialogContent className="w-fit rounded-3xl">
        <DialogHeader>
          <DialogTitle className="">Post removed</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Remove;
