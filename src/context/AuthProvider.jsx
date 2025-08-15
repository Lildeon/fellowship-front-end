import { useEffect, useState } from "react";
import { Credential } from "./context";
import api from "@/services/axios";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    }
  }, [toggle]);

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentPage");
    localStorage.removeItem("pageNumber");
    localStorage.removeItem("pageCount");
    await api.post("/logout");
    setUser(null);
    setToggle(!toggle);
  };
  return <Credential value={{ user: user, logout }}>{children}</Credential>;
};
