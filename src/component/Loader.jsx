import { BarLoader, BeatLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const Loader = ({ loading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <BarLoader
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={override}
    />
  );
};

export default Loader;

// eslint-disable-next-line react/prop-types
export const Feedloader = ({ loading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <BeatLoader
      loading={loading}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={override}
    />
  );
};
