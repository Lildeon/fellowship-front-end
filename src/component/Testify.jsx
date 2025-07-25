import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useNavigate } from "react-router";
import api from "@/services/axios";

const Testify = () => {
  const [content, setContent] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async () => {
    const post = { content };
    await api.post(`testify`, post);
    navigate("/home");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex text-lg border justify-center rounded-3xl py-1 px-7 bg-red-950 text-white">
            Testify{" "}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Your Testimony is a key to unlocking new Souls{" "}
            </DialogTitle>
          </DialogHeader>

          <form
            action={handleSubmit}
            className="flex flex-col gap-5 overflow-auto"
          >
            <textarea
              name="content"
              cols={50}
              rows={5}
              className="resize-none rounded-2xl p-1"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your Testimony Counts, free someone from the bondage of the Devil."
            />

            <div className="inline-flex gap-5">
              <button type="submit">Post</button>
            </div>
          </form>

          <DialogDescription />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Testify;
