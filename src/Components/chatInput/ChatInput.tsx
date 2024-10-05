import { useState } from "react";

export const ChatInput = () => {
  const [text, setText] = useState("");

  const handleCharacterCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <section className="h-[25%] w-full p-4">
      <form className="h-full w-full border-2 border-solid border-[#DCDADA] rounded relative">
        <span className="invisible">fadsfdsafds</span>
        <textarea
          className="w-full h-1/2 pl-2 focus:outline-none resize-none overflow-y-auto text-wrap text-xs items-center"
          value={text}
          onChange={handleCharacterCount}
          name="message"
          id="message"
          placeholder="Message Amy C."
        />
        <span className="invisible absolute left-2 bottom-0">fadsfdsafds</span>
        <button
          className={`w-16 h-8 ml-2 mb-2 text-center text-sm text-white rounded-[8px] ${text.length > 0 ? "bg-[#C18119]" : "bg-[#B8B8B8]"}
         [box-shadow:4px_4px_4px_0px_rgba(0,_0,_0,_0.10)] absolute right-2 bottom-0`}
          disabled={text.length === 0}
        >
          Send
        </button>
      </form>
    </section>
  );
};
