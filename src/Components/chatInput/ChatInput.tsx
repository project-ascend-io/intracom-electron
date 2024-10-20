import { useState } from "react";
import { sendMessage } from "../../services/messagesService";
import { useAuth } from "../../context/auth-context";
import { useCurrentlySelectedChatContext } from "../../context/currentlySelectedChatContext";
import { BeatLoader } from "react-spinners";

export const ChatInput: React.FC = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { currentlySelectedChat } = useCurrentlySelectedChatContext();

  const handleCharacterCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await sendMessage(text, user._id, currentlySelectedChat._id);
    setIsLoading(false);
    setText("");
  };

  return (
    <section className="absolute bottom-0 h-[25%] w-full p-4">
      <form
        className="h-full w-full border-2 border-solid border-[#DCDADA] rounded relative"
        onSubmit={handleSubmit}
      >
        <span className="invisible">Placeholder space for enhancements</span>
        <textarea
          className="w-full h-1/2 pl-2 focus:outline-none resize-none overflow-y-auto text-wrap text-xs items-center"
          value={text}
          onChange={handleCharacterCount}
          name="message"
          id="message"
          placeholder={`Message ${currentlySelectedChat?.users.filter((userObject) => userObject._id !== user._id)[0].username}`}
        />
        <span className="invisible absolute left-2 bottom-0">
          Placeeholder space for enhancements
        </span>
        <button
          type="submit"
          className={`w-16 h-8 ml-2 mb-2 text-center text-sm text-white rounded-[8px] ${text.length > 0 ? "bg-[#C18119]" : "bg-[#B8B8B8]"}
         [box-shadow:4px_4px_4px_0px_rgba(0,_0,_0,_0.10)] absolute right-2 bottom-0`}
          disabled={text.length === 0}
        >
          {isLoading && <BeatLoader color="white" size={8} />}Send
        </button>
      </form>
    </section>
  );
};
