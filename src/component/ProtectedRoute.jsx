import { Credential } from "@/context/context";
import { use } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user } = use(Credential);
  const userId = user ? user : localStorage.getItem("user");

  return userId ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
