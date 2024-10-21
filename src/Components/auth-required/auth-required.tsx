import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useEffect, useState } from "react";
import { checkUser } from "../../services/auth";

const AuthRequired = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const data = await checkUser();
      if (data?.success) {
        setUser(data.responseObject);
      } else {
        console.error("Failed to authenticate user");
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRequired;
