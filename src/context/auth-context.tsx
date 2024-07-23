import React, { useContext, createContext, useState } from "react";

type AuthContextType = {
  user: any;
  setUser: any;
};
type AuthProviderType = {
  children: React.ReactNode;
};
// TODO: Update this with expected values sent from backend
type AuthUserType = {
  [key: string]: any;
};

// stores auth context values
const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<AuthUserType | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// auth consumer hook - this is what will be imported to utilize the user object and set user function
export const useAuth = () => {
  return useContext(AuthContext);
};
