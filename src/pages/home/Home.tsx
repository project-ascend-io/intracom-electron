import Sidebar from "../../Components/sidebar/Sidebar";
import { Header } from "../../Components/header/Header";
import { ContextWindow } from "../../Components/contextWindow/ContextWindow";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row h-7/8">
        <Sidebar />
        <ContextWindow />
      </div>
    </>
  );
};
