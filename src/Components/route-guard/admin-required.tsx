import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

interface AdminRequiredProps {
  children: React.ReactNode;
}

const AdminRequired: React.FC<AdminRequiredProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "Admin") {
    return <Navigate to="/anauthorized" />;
  }

  return <>{children}</>;
};

export default AdminRequired;
