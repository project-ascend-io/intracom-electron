import Sidebar from "../../Components/sidebar/Sidebar";
import { Header } from "../../Components/header/Header";
import { ContextWindow } from "../../Components/contextWindow/ContextWindow";
import { ConversationsProvider } from "../../context/conversationsContext";
import { CurrentlySelectedChatProvider } from "../../context/currentlySelectedChatContext";
import { CurrentUsersProvider } from "../../context/currentUsersContext";
import { SocketProvider } from "../../context/socketContext";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row h-7/8">
        <Sidebar />
        <CurrentUsersProvider>
          <ConversationsProvider>
            <CurrentlySelectedChatProvider>
              <SocketProvider>
                <ContextWindow />
              </SocketProvider>
            </CurrentlySelectedChatProvider>
          </ConversationsProvider>
        </CurrentUsersProvider>
      </div>
    </>
  );
};
