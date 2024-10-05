import { useNavigate } from "react-router-dom";
import { Avatar } from "../../Components/avatar/Avatar";
import "./NewDirectMessage.css";

export const NewDirectMessage = () => {
  const navigate = useNavigate();

  const handleClosePage = () => {
    navigate("/messages");
  };

  const handleCreateConversation = () => {
    navigate("/conversation");
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
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="#979797"
              stroke-width="2"
              stroke-linecap="round"
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
          />
        </form>
        <div
          id="userList"
          className="ml-16 mt-2 max-w-[89%] border border-solid border-[#979797] rounded-lg max-h-80 overflow-y-scroll"
        >
          <ul className="flex flex-col w-full">
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
            <li
              className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
              onClick={handleCreateConversation}
            >
              <span className="flex flex-row items-center select-none">
                <Avatar style={"w-8 h-8 rounded-[50%] mr-4"} user={null} />
                <h6 className="font-semibold">Amy C.</h6>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
};
