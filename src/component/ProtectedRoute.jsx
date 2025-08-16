import { Credential } from "@/context/context";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user } = useContext(Credential);
  const userId = user ? user : localStorage.getItem("user");

  return userId ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
