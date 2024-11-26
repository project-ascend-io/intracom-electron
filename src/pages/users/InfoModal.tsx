import React from "react";
import ReactModal from "react-modal";
import { FaExclamationCircle } from "react-icons/fa";
import "./InfoModal.css";

// import closeIcon from "./../../assets/tools/reactDevTools/icons/close-icon.svg";

interface InfoModalProps {
  onOpen: boolean;
  onInfoModalClose: () => void;
  isInviteSuccessful: boolean;
  message: string[];
  onInviteMoreUsers: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  onOpen,
  onInfoModalClose,
  isInviteSuccessful,
  message,
  onInviteMoreUsers,
}) => {
  return (
    <ReactModal
      isOpen={onOpen}
      onRequestClose={onInfoModalClose}
      style={{
        content: {
          width: "700px",
          height: "300px",
          margin: "auto",
          paddingLeft: "25px",
          paddingRight: "25px",
        },
      }}
    >
      <button
        className="absolute top-8 right-10 text-3xl font-thin"
        onClick={onInfoModalClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-black-500"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {isInviteSuccessful ? (
        <>
          <div className="text-3xl font-bold pt-3 pb-6">
            You've invited {message.length}
            {message.length > 1 ? " people." : " person."}
          </div>
          <div className="flex flex-wrap items-center text-xl font-bold pt-2 pb-2">
            <div className="mr-1 whitespace-nowrap">
              You've successfully invited:
            </div>
            <div className="italic flex flex-wrap gap-1">
              {message.map((email, index) => (
                <span key={index} className="whitespace-nowrap">
                  {email}
                  {index < message.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="pb-4">
            Your invitations have been sent. If you'd like to add more users,
            click on Invite More users.
          </div>
        </>
      ) : (
        <>
          <div className="flex">
            <div>
              <FaExclamationCircle
                className="text-customRed2 pt-4 pl-2 pb-5"
                style={{ fontSize: "120px" }}
              />
            </div>
            <div className="text-4xl font-bold pt-4 pb-10 pl-7">Error</div>
          </div>
          <div className="flex flex-wrap items-center text-lg font-bold italic pt-2 pb-12 pl-2">
            <div className="whitespace-nowrap">
              {message[0]} could not be invited because they are in the
              workspace
            </div>
          </div>
        </>
      )}
      <div className="buttons-container">
        <button
          className="text-customBrown bg-white shadow hover:shadow-lg hover:bg-white font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2"
          style={{
            outline: "1px solid #C18119",
          }}
          onClick={() => {
            onInviteMoreUsers();
            onInfoModalClose();
          }}
        >
          Invite More Users
        </button>
        <button
          className="text-white bg-customBrown shadow hover:shadow-lg hover:bg-customBrown focus:ring-4 focus:ring-customBrown font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2 dark:bg-customBrown focus:outline-none w-1/6 ml-4"
          onClick={onInfoModalClose}
        >
          Done
        </button>
      </div>
    </ReactModal>
  );
};

export default InfoModal;
