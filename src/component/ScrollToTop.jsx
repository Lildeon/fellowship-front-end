import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

    // sessionStorage.setItem("scrollPosition", window.scrollY);
    // window.scrollTo(0, Number(sessionStorage.getItem("scrollPosition")) || 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
