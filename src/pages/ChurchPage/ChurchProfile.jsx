import { useNavigate } from "react-router";
import { useState } from "react";
import api from "@/services/axios";

const ChurchProfile = () => {
  let navigate = useNavigate();
  const user = localStorage.getItem("user");

  const churchProfile = {
    name: "",
    founders: "",
    year: "",
    bio: "",
    about: "",
    executive: "",
  };
  const [church, setChurch] = useState(churchProfile);
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) =>
    setChurch({ ...church, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = church;
    const res = await api.post(`api/create-church-profile/${user}`, data);
    if (res.status === 201) {
      navigate("/explore/churches");
    }
    setText(res.data);
  };

  return (
    <div className="px-5 max-w-xl m-auto max-[500px]:pt-10">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <label>Name of Church</label>
            <input
              type="text"
              name="name"
              placeholder="eg: The Lord's Pentecostal Church International"
              onChange={(e) => handleChange(e)}
              required
              defaultValue={church.name}
            />

            <label>Founders</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="founders"
              placeholder="eg: Apostle Sam John Amedzro | Apostle Atipoe | Apostle Wuaku..."
              defaultValue={church.founders}
            />
            <label>Year founded</label>
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              name="year"
              placeholder="year"
              defaultValue={church.year}
            />
            <button
              type="button"
              onClick={handleNext}
              className={church?.name.length === 0 ? "hidden" : "flex"}
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
              placeholder="eg: To bring people to know Jesus Christ and join His family, to build them to Christlike maturity and equip them through the Holy Spirit for ministry in the church and the world to the glory of God.
"
              rows={5}
              defaultValue={church.bio}
            />
            <div className="flex justify-between gap-5 pb-10">
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
              defaultValue={church.about}
            />
            <div className="flex justify-between gap-5 pb-10">
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
              placeholder="eg: Apostle Erick Otoo(General Overseer) | Apostle Paul Sowu(General Secetary) | Apostle David Dzeble(Director for Misson)..."
              defaultValue={church.executive}
            />
            <div>
              <div className="flex justify-between gap-5 pb-10">
                <button type="button" onClick={handlePrev}>
                  Back
                </button>
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
              <p className="text-red-700 text-lg">{text}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChurchProfile;
