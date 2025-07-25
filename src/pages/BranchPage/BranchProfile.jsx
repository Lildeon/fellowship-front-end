import { useNavigate } from "react-router";
import { useState } from "react";
import api from "@/services/axios";
import { Church } from "lucide-react";

const BranchProfile = () => {
  let navigate = useNavigate();
  const user = localStorage.getItem("user");

  const branchProfile = {
    name: "",
    branch: "",
    pastor: "",
    tag: "",
    bio: "",
    year: "",
    about: "",
    executive: "",
    picture: "",
  };
  const [branch, setBranch] = useState(branchProfile);
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) =>
    setBranch({ ...branch, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (branch.name.length > 0) {
      const res = await api.post(`api/create-branch-profile/${user}`, branch);
      if (res.status === 201) {
        navigate("/explore/branches");
      }
      setText(res.data);
    }
    return;
  };
  return (
    <div className="px-5 max-w-lg m-auto max-[500px]:pt-10">
      <form action={handleSubmit}>
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <label>Name of Church</label>
            <input
              type="text"
              name="name"
              placeholder="Church name"
              onChange={(e) => handleChange(e)}
              required={true}
              defaultValue={branch.name}
            />
            <label>Branch Pastor</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="pastor"
              placeholder="Pastor Francis Mintah"
              required={true}
              defaultValue={branch.pastor}
            />
            <label>Unique name</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="tag"
              placeholder="eg House of Prayers and Wonders of God"
              defaultValue={branch.tag}
            />
            <button
              type="button"
              onClick={handleNext}
              className={branch.name.length === 0 ? "hidden" : "flex pt-10"}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <label>bio</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="bio"
              placeholder="eg: To bring people to know Jesus Christ and join His family, to build them to Christlike maturity and equip them through the Holy Spirit for ministry in the church and the world to the glory of God."
              defaultValue={branch.bio}
              rows={5}
            />

            <label>Branch location</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="branch"
              placeholder="location"
              required={true}
              defaultValue={branch.branch}
            />
            <label>Year founded</label>
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              name="year"
              placeholder="year"
              defaultValue={branch.year}
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
            <label>About</label>

            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="about"
              placeholder="Brief history about church"
              rows={10}
              defaultValue={branch.about}
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
            <label>Executives</label>
            <textarea
              onChange={(e) => handleChange(e)}
              type="text"
              name="executive"
              placeholder="eg: David Jakes | John Eben"
              defaultValue={branch.executive}
            />

            <div className="flex flex-col gap-5">
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
          </div>
        )}
      </form>
    </div>
  );
};

export default BranchProfile;
