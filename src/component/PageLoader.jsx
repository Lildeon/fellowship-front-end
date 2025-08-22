import { MoonLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const PageLoader = ({ loading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <MoonLoader
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={override}
    />
  );
};

export default PageLoader;
