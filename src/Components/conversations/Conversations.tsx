import { Connection } from "../connection/Connection";

export const Conversations = () => {
  return (
    <section className=" h-16/21 overflow-y-auto">
      <ul className="flex flex-col mt-4">
        <Connection />
        <Connection />
        <Connection />
        <Connection />
        <Connection />
      </ul>
    </section>
  );
};
