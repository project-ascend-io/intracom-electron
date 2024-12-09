import React from "react";
import ReactModal from "react-modal";
import { FaExclamationCircle } from "react-icons/fa";

interface InfoModalProps {
  onInfoModalOpen: boolean;
  onInfoModalClose: () => void;
  isSuccessful: boolean;
  isInviteModal: boolean;
  message: string[];
  onInviteMoreUsers?: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  onInfoModalOpen,
  onInfoModalClose,
  isSuccessful,
  isInviteModal,
  message,
  onInviteMoreUsers,
}) => {
  const formatStringWithEmail = (input: string): JSX.Element => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = input.match(emailRegex);

    if (match) {
      const email = match[0];
      const parts = input.split(email);

      return (
        <span>
          {parts[0]}
          <i>"{email}"</i>
          {parts[1]}
        </span>
      );
    }

    return <span>{input}</span>;
  };
  return (
    <ReactModal
      isOpen={onInfoModalOpen}
      onRequestClose={onInfoModalClose}
      style={{
        content: {
          width: isInviteModal ? "700px" : "500px",
          height: isInviteModal ? "300px" : "250px",
          margin: "auto",
          paddingLeft: "25px",
          paddingRight: "25px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          background: "#fff",
          overflow: "hidden",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1010,
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

      {isSuccessful && (
        <>
          {isInviteModal && (
            <div className="text-3xl font-bold pt-3 pb-6">
              <>
                You've invited {message.length}
                {message.length > 1 ? " people." : " person."}
              </>
            </div>
          )}

          {isInviteModal ? (
            <>
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
              <div className="pb-16">
                Your invitations have been sent. If you'd like to add more
                users, click on Invite More users.
              </div>
            </>
          ) : (
            <div className="text-xl text-center font-bold pb-4 pt-20 pl-6 pr-6">
              {formatStringWithEmail(message[0])}
            </div>
          )}
        </>
      )}

      {!isSuccessful &&
        (isInviteModal ? (
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
        ) : (
          <>
            <div className="flex">
              <div>
                <FaExclamationCircle
                  className="text-customRed2 pt-4 pl-2 pb-5"
                  style={{ fontSize: "100px" }}
                />
              </div>
              <div className="text-2xl font-bold pt-4 pb-6 pl-7">Error</div>
            </div>
            <div className="text-lg font-bold italic pl-2 pr-2">
              {" "}
              {message[0]}
            </div>
          </>
        ))}

      <div className="flex flex-row justify-end gap-2">
        {onInviteMoreUsers && (
          <button
            className="text-customBrown bg-white shadow hover:shadow-lg hover:bg-white font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2"
            style={{
              outline: "2px solid #C18119",
            }}
            onClick={() => {
              onInviteMoreUsers();
              onInfoModalClose();
            }}
          >
            Invite More Users
          </button>
        )}

        <button
          className="text-white bg-customBrown shadow hover:shadow-lg hover:bg-customBrown focus:ring-4 focus:ring-customBrown font-bold rounded-lg text-m  dark:bg-customBrown focus:outline-none px-5 py-2.5 me-2 mb-2 w-1/7"
          onClick={onInfoModalClose}
        >
          Done
        </button>
      </div>
    </ReactModal>
  );
};

export default InfoModal;
