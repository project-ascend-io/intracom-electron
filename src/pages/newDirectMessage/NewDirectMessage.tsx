import { useNavigate } from "react-router-dom";
import "./NewDirectMessage.css";
import { useCurrentUsersContext } from "../../context/currentUsersContext";
import { UserList } from "../../Components/userList/UserList";
import { useState } from "react";

export const NewDirectMessage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUsers, setFilteredCurrentUsers } = useCurrentUsersContext();

  const navigate = useNavigate();

  const handleClosePage = () => {
    navigate("/messages");
  };

  const handleFilterUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredUsers = currentUsers.filter((user) =>
      user.username.toLowerCase().startsWith(event.target.value.toLowerCase()),
    );
    setFilteredCurrentUsers(filteredUsers);
  };

  return (
    <article className="w-full h-full">
      <header className="flex justify-between items-center px-6 h-1/6 w-full">
        <h3 className="font-bold text-2xl select-none">New Message</h3>
        <span onClick={handleClosePage} className="hover:cursor-pointer">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke="#979797"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="#979797"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </header>
      <section className="w-full">
        <form className="flex flex-start mx-6 h-1/5 items-center" role="search">
          <label className="font-medium" htmlFor="search">
            To:
          </label>
          <input
            className="pl-6 w-1/2 focus:outline-none"
            type="text"
            name="search"
            id="search"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleFilterUsers}
          />
        </form>
        <UserList />
      </section>
    </article>
  );
};
