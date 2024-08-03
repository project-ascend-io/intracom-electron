import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useEffect, useState } from "react";
import { checkUser } from "../../services/auth";
import { ResponseObject } from "../../types/auth";
const AuthRequired = () => {
  const { user, setUser } = useAuth();
  //Note: I created this loading state to trigger updated render once the fetch is complete. You have to include a state value (instead of just relying on the user value above) because it syncs with the component.
  const [loading, setLoading] = useState(true);
  const getUserData = async () => {
    //check for active session
    const data = await checkUser();
    //TODO: add some global error handling within context to display auth errors
    if (data?.success) setUser(data.responseObject);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) getUserData();
    else setLoading(false);
  }, []);
  return loading ? null : user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRequired;
