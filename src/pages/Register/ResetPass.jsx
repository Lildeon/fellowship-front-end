import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ResetPass = () => {
  const userProfile = {
    bio: "",
    about: "",
    church: "",
    branch: "",
    uniqueId: "",
    title: "",
    language: "",
    education: "",
    nationality: "",
    marry: "",
    job: "",
    location: "",
  };
  const [profile, setProfile] = useState(userProfile);
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSkip = () => navigate("/sign-in");

  const handleSubmit = async () => {
    // await axios.put(`http://localhost:8080/create-profile`, profile);
  };

  return (
    <div className="h-svh w-full flex flex-col gap-5 justify-center items-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
          <CardDescription>
            {/* What you want others to know about you */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <textarea
                  type="text"
                  name="bio"
                  placeholder="bio"
                  onChange={(e) => handleChange(e)}
                />
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <textarea
                  type="text"
                  name="about"
                  placeholder="About you"
                  rows={5}
                  onChange={(e) => handleChange(e)}
                />
                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="church"
                  placeholder="Name of church"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="branch"
                  placeholder="branch"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="uniqueId"
                  placeholder="Branch Unique Name"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="title"
                  placeholder="title"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="language"
                  placeholder="language"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="education"
                  placeholder="education"
                />
                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>

                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="nationality"
                  placeholder="nationality"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>
                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="marry"
                  placeholder="marital status"
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>
                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  name="job"
                  placeholder="job"
                  onChange={(e) => handleChange(e)}
                />

                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>
                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 12 && (
              <div className="flex flex-col gap-5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="location"
                  placeholder="Your location"
                />
                <div className="flex justify-between">
                  <button type="button" onClick={handlePrev}>
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="border p-1 rounded-2xl w-fit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <button
        type="button"
        className="px-5 py-1 rounded-2xl bg-blue-700 text-white font-medium"
        onClick={handleSkip}
      >
        Skip
      </button>
    </div>
  );
};

export default ResetPass;
