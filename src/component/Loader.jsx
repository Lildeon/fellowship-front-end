import { BounceLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const Loader = ({ loading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <BounceLoader
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={override}
    />
  );
};

export default Loader;
