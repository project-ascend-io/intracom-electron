import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
const AuthRequired = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRequired;
