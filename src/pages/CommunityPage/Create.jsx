import { useNavigate } from "react-router";
import { useState } from "react";
import api from "@/services/axios";

const Create = () => {
  let navigate = useNavigate();
  const user = localStorage.getItem("user");

  const fellowshipProfile = {
    name: "",
    branch: "",
    uniqueName: "",
    bio: "",
    about: "",
    slogan: "",
    excutive: "",
    picture: "",
  };
  const [fellowship, setFellowship] = useState(fellowshipProfile);
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) =>
    setFellowship({ ...fellowship, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post(
      `api/create-fellowship-page/${user}`,
      fellowship,
    );

    res.status === 201 ? navigate("/communities/explore") : setText(res.data);
  };

  return (
    <div className="px-5 max-w-lg m-auto max-[500px]:pt-10">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <label>Name of Fellowship</label>
            <input
              type="text"
              name="name"
              placeholder="Name of fellowship"
              onChange={(e) => handleChange(e)}
              defaultValue={fellowship.name}
            />

            <button
              type="button"
              onClick={handleNext}
              className={fellowship.name.length === 0 ? "hidden" : "flex pt-10"}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <label>Branch</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="branch"
              placeholder="branch"
              defaultValue={fellowship.branch}
            />
            <div className="flex justify-between pt-10">
              <button type="button" onClick={handlePrev}>
                Back
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <label>Branch unique name</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="uniqueName"
              placeholder="Branch unique name"
              defaultValue={fellowship.uniqueName}
            />

            <div className="flex justify-between pt-10">
              <button type="button" onClick={handlePrev}>
                Back
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-5">
            <label>bio</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="bio"
              placeholder="bio"
              rows={5}
              defaultValue={fellowship.bio}
            />

            <div className="flex justify-between pt-10">
              <button type="button" onClick={handlePrev}>
                Back
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="flex flex-col gap-5">
            <label>About</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="about"
              placeholder="About fellowship"
              rows={5}
              defaultValue={fellowship.about}
            />
            <div className="flex justify-between pt-10">
              <button type="button" onClick={handlePrev}>
                Back
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="flex flex-col gap-5">
            <label>Fellowship slogan</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="slogan"
              placeholder="Fellowship slogan"
              defaultValue={fellowship.slogan}
            />
            <div className="flex justify-between pt-10">
              <button type="button" onClick={handlePrev}>
                Back
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 7 && (
          <div className="flex flex-col gap-5">
            <label>Fellowship Executives</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="executive"
              placeholder="Fellowship Executives eg: Gideon | Helena  | Mary Okpoti"
              defaultValue={fellowship.executive}
            />
            <div>
              <div className="flex justify-between pt-10">
                <button type="button" onClick={handlePrev}>
                  Back
                </button>
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
              <p className="text-red-700">{text}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Create;
