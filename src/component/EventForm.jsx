/* eslint-disable react/prop-types */
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/axios";
import { useState } from "react";

const EventForm = ({ Id, eventpath }) => {
  const eventData = {
    eventName: "",
    description: "",
    date: "",
    start: "",
    end: "",
  };
  const [event, setEvent] = useState(eventData);
  const handleEvent = (e) =>
    setEvent({ ...event, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`${eventpath}/${Id}`, event);
  };

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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      </DialogTrigger>

      <DialogContent className="h-100 mt-10">
        <DialogHeader>
          <DialogTitle className="text-center">Create event here</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="touch-auto overflow-auto h-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-w-md pt-5"
          >
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              onChange={(e) => handleEvent(e)}
              placeholder="Event name here"
            />

            <label>Description</label>
            <textarea
              name="description"
              onChange={(e) => handleEvent(e)}
              placeholder="What's the event about?"
            />
            <label>Date</label>

            <input type="date" name="date" onChange={(e) => handleEvent(e)} />
            <label>Time</label>
            <div className="flex justify-between max-[500px]:flex-col">
              <span>start</span>
              <input
                type="time"
                name="start"
                className="w-full"
                onChange={(e) => handleEvent(e)}
              />
              <span>end</span>
              <input
                type="time"
                name="end"
                className="w-full"
                onChange={(e) => handleEvent(e)}
              />
            </div>

            <button type="submit" className="bg-green-700 rounded-2xl p-2">
              Create
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
