import { Message } from "../message/Message";

export const ChatBox = () => {
  return (
    <section className="w-full h-[62%]">
      <time className="w-full pt-2 flex justify-center text-[#777777] text-sm">
        {"Thursday September 19th"}
      </time>
      <Message
        content={
          "Hi Amy, will you be attending the company wide offsite next month? I could use some help preparing the welcome presentation. If you can help please let me know and we can set up a meeting for next week. Thanks!"
        }
        createdAt={"10:23 am"}
        sender={{ username: "Joe M." }}
      />
      <Message
        content={
          "Yes, I plan to be at the offsite, and I am happy to help you with the welcome presentation. I am available Tuesday and Thursday in the morning next week to sync up.  "
        }
        createdAt={"10:37 am"}
        sender={{ username: "Amy C." }}
      />
    </section>
  );
};
