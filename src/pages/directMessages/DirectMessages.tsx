import { useNavigate } from "react-router-dom";
import { Conversations } from "../../Components/conversations/Conversations";
import { SearchBar } from "../../Components/searchBar/SearchBar";
export const DirectMessages = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/new-direct-message");
  };

  return (
    <article className="w-full h-full">
      <header className="flex justify-between items-center px-6 h-1/6 w-full">
        <h3 className="font-bold text-2xl select-none">Direct Messages</h3>
        <button
          className="text-white px-2.5 py-2 rounded-[8px] bg-[#DE982F] [box-shadow:4px_4px_4px_0px_rgba(0,_0,_0,_0.10)]"
          onClick={handleButtonClick}
        >
          New Message
        </button>
      </header>
      <section className="w-full">
        <SearchBar
          style={
            "flex flex-start mx-6 h-1/5 items-center rounded border-solid border-2 border-[#D5D3D2]"
          }
          text={"Search DM's"}
        />
      </section>
      <Conversations />
    </article>
  );
};
