import { useNavigate } from "react-router-dom";
import { Avatar } from "../../Components/avatar/Avatar";
import { ChatBox } from "../../Components/chatBox/ChatBox";
import { ChatInput } from "../../Components/chatInput/ChatInput";

export const Conversation = () => {
  const navigate = useNavigate();

  const handleClosePage = () => {
    navigate("/messages");
  };

  // TODO: Add loading state to this component
  return (
    <article className="w-full h-full">
      <header className="flex flex-col items-start py-3 px-2 h-[13%] w-full border-b-2 border-solid border-[#DCDADA]">
        <div className="flex justify-between w-full">
          <span className="flex flex-row justify-between pt-2 items-start hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg">
            <span className="flex flex-row items-center select-none">
              <Avatar style={"w-10 h-10 rounded-[50%] mr-4"} user={null} />
              <h6 className="font-semibold text-xs">Amy C.</h6>
            </span>
          </span>
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
        </div>
      </header>
      <ChatBox />
      <ChatInput />
    </article>
  );
};
