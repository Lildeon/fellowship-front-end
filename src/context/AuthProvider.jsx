import { useEffect, useState } from "react";
import { Credential } from "./context";
import axios from "axios";

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
    await axios.post("https://fellowship-backend.up.railway.app/logout", {
      withCredentials: true,
    });
    setUser(null);
    setToggle(!toggle);
  };
  return (
    <Credential.Provider value={{ user: user, logout }}>
      {children}
    </Credential.Provider>
  );
};
