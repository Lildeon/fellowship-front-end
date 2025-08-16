/* eslint-disable react/prop-types */
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/axios";

const Comment = ({ postID, url }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = { content };
    await api.post(`${url}/${postID}`, comment);
    setContent("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2 hover:bg-gray-400 rounded-full">
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
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>What is on your mind? </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 overflow-auto"
        >
          <textarea
            name="content"
            cols={50}
            rows={5}
            className="resize-none rounded-2xl p-1"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Inspire someone to Christ"
          />

          <div className="inline-flex gap-5">
            {content.length > 0 && <button type="submit">Post</button>}
          </div>
        </form>

        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};

export default Comment;
