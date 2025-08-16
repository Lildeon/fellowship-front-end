import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import api from "@/services/axios";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const Upload = ({ userPhoto, coverPhoto }) => {
  const [photo, setPhoto] = useState({});
  const [selected, setSelected] = useState("profile");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const loading = photo.name?.length > 0 ? true : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selected === "profile") {
      formData.append("userPhoto", photo);
      await api.put(`${userPhoto}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelected("");
    } else {
      formData.append("coverPhoto", photo);
      await api.put(`${coverPhoto}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelected("");
    }
  };

  const upload = (e) => {
    const file = e.target.files[0];
    file.url = URL.createObjectURL(e.target.files[0]);
    setPhoto(file);
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(photo.url);
    };
  }, [photo.url]);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="size-7"
          >
            <path d="M440-440ZM132.31-140Q102-140 81-161q-21-21-21-51.31v-455.38Q60-698 81-719q21-21 51.31-21h122.15l74-80h223.85v60H354.62l-73.39 80H132.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85v-340h60v340Q820-182 799-161q-21 21-51.31 21H132.31ZM760-680v-80h-80v-60h80v-80h60v80h80v60h-80v80h-60ZM440-275.39q68.85 0 116.73-47.88 47.88-47.88 47.88-116.73t-47.88-116.73Q508.85-604.61 440-604.61t-116.73 47.88Q275.39-508.85 275.39-440t47.88 116.73q47.88 47.88 116.73 47.88Zm0-59.99q-44.31 0-74.46-30.16-30.16-30.15-30.16-74.46 0-44.31 30.16-74.46 30.15-30.16 74.46-30.16 44.31 0 74.46 30.16 30.16 30.15 30.16 74.46 0 44.31-30.16 74.46-30.15 30.16-74.46 30.16Z" />
          </svg>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pb-3">
            <div className="flex gap-5">
              <label>
                {selected === "profile" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7 hover:stroke-blue-500 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7 hover:stroke-orange-500 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                )}

                <input
                  onChange={upload}
                  type="file"
                  className="hidden"
                  required={true}
                  accept="image/*"
                />
              </label>
              <div>
                <div>
                  {photo.name?.length > 0 && (
                    <div className="flex gap-2 items-center">
                      <button onClick={() => setPhoto("")}>
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
              </div>
              <select
                name=""
                id=""
                className="rounded-2xl font-medium"
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="profile">Profile</option>
                <option value="background">background</option>
              </select>
            </div>

            <div className="overflow-auto touch-auto">
              {photo.url && (
                <img
                  src={photo.url}
                  alt="photo"
                  className="w-50 h-50 object-contain"
                />
              )}
            </div>
            <BeatLoader loading={loading} size={15} cssOverride={override} />
            <div>
              {photo.url && (
                <button
                  type="submit"
                  className="border px-2 rounded-2xl w-full hover:bg-green-800"
                >
                  save
                </button>
              )}
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Upload;
