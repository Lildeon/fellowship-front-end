/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/axios";
import Loader from "./Loader";

const CreatePost = ({ path, Id }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const loading = file.name?.length > 0 ? true : false;

  const handleSubmit = async () => {
    const post = { content, file };

    await api.post(`${path}/${Id}`, post, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setFile("");
    setContent("");
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(file.url);
    };
  }, [file.url]);

  return (
    <Dialog>
      <DialogTrigger>
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </DialogTrigger>
      <DialogContent className="h-70 mt-10">
        <DialogHeader>
          <DialogTitle>Create Post </DialogTitle>
        </DialogHeader>

        <div className="touch-auto overflow-auto">
          <form
            action={handleSubmit}
            className="flex flex-col gap-3 overflow-auto"
          >
            <textarea
              name="content"
              rows={6}
              className="resize-none rounded-2xl p-1 border-hidden"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Inspire someone to Jesus Christ"
            />
            <div className="overflow-hidden">
              {file.type?.startsWith("image/") && (
                <img src={file.url} alt="photo" className="object-contain" />
              )}
              {file.type?.startsWith("video/") && (
                <video
                  src={file.url}
                  autoPlay
                  controls
                  className="h-100 w-full"
                  muted
                ></video>
              )}
            </div>
            <Loader loading={loading} />

            <div className="flex gap-5  items-center">
              <label className="flex gap-2">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    file.url = URL.createObjectURL(e.target.files[0]);
                    setFile(file);
                  }}
                  name="file"
                  accept="image/*, video/*"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7 hover:stroke-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </label>

              <div className="h-fit">
                {file.name?.length > 0 && (
                  <div className="flex gap-2 items-center">
                    {/* {file.type} */}

                    <button onClick={() => setFile("")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-7 hover:stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div>
                {(file?.name?.length > 0 || content.length > 0) && (
                  <button
                    type="submit"
                    className="text-lg font-medium px-10 border hover:bg-green-800 rounded-3xl"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <DialogDescription className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
