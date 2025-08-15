import { useEffect, useState } from "react";
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

const Post = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [render, setRender] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loading = file.name?.length > 0 ? true : false;
  console.log(file);

  const imageMaxSize = 5 * 1024 * 1024;
  const videoMaxSize = 20 * 1024 * 1024;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/") && file.size <= imageMaxSize) {
      file.url = URL.createObjectURL(e.target.files[0]);
      setFile(file);
      setErrorMessage("");
    } else if (file.type.startsWith("image/") && file.size > imageMaxSize) {
      setErrorMessage(`${file.name} is more than 5Mb`);
    }
    if (file.type.startsWith("video/") && file.size <= videoMaxSize) {
      file.url = URL.createObjectURL(e.target.files[0]);
      setFile(file);
      setErrorMessage("");
    } else if (file.type.startsWith("video/") && file.size > videoMaxSize) {
      setErrorMessage(`${file.name} is more than 20Mb`);
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(file.url);
    };
  }, [render, file.url]);
  const handleSubmit = async () => {
    const post = { content, file };

    await api.post(`post`, post, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFile("");
    setContent("");
    setRender(!render);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2 max-[500px]:gap-4 p-2 rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 max-[500px]:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="hidden xl:inline max-[500px]:inline">Post</span>
        </div>
      </DialogTrigger>
      <DialogContent className="h-70 mt-10 touch-auto overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div className="">
          <form action={handleSubmit} className="flex flex-col gap-3">
            <textarea
              name="content"
              rows={6}
              className="resize-none rounded-2xl p-1 border-hidden"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Inspire someone to Christ"
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
            <p>{errorMessage}</p>
            <div className="flex gap-5 w-full max-[500px]:flex-wrap">
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex gap-5">
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
                </div>
              </label>

              <div className="h-fit">
                {(file.name?.length > 0 || errorMessage.length > 0) && (
                  <div className="flex gap-2 items-center">
                    {/* {file.type} */}

                    <button
                      onClick={() => {
                        setFile("");
                        setErrorMessage("");
                      }}
                    >
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
              <div className="h-fit">
                {(file?.name?.length > 0 || content.length > 0) && (
                  <button
                    type="submit"
                    className="text-lg font-medium px-10 hover:bg-green-800 border rounded-3xl"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <DialogDescription className="hidden"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Post;
