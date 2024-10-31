import { createContext, useContext, useState, FC, useEffect } from "react";

import { User } from "../Components/connection/Connection.types";
import { fetchUsers } from "../services/newMessageService";
import { useAuth } from "./auth-context";

interface CurrentUsersContextType {
  currentUsers: User[];
  setCurrentUsers: React.Dispatch<React.SetStateAction<User[]>>;
  filteredCurrentUsers: User[];
  setFilteredCurrentUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const CurrentUsersContext = createContext<CurrentUsersContextType | undefined>(
  undefined,
);

export const useCurrentUsersContext = (): CurrentUsersContextType => {
  const context = useContext(CurrentUsersContext);

  if (!context) {
    throw new Error(
      "useCurrentUsersContext must be used within a CurrentUsersProvider",
    );
  }

  return context;
};

export const CurrentUsersProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [filteredCurrentUsers, setFilteredCurrentUsers] =
    useState<User[]>(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchUsers(user).then((data) => {
      setCurrentUsers(data);
    });
  }, []);

  return (
    <CurrentUsersContext.Provider
      value={{
        currentUsers,
        setCurrentUsers,
        filteredCurrentUsers,
        setFilteredCurrentUsers,
      }}
    >
      {children}
    </CurrentUsersContext.Provider>
  );
};
