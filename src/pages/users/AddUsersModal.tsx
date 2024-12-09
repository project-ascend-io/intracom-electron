import React, { useState } from "react";
import { postUserInvites } from "../../services/users";
import ReactModal from "react-modal";
import { userEmailsSchema, userEditParamsSchema } from "../../types/users";
import InfoModal from "./InfoModal";

interface UsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  onAddMoreUsers: () => void;
}

const UsersModal: React.FC<UsersModalProps> = ({
  isOpen,
  onClose,
  organizationId,
  onAddMoreUsers,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [emailsList, setEmailsList] = useState([]);
  const [infoMessage, setInfoMessage] = useState([]);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isInviteSuccessful, setInviteSuccessful] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (value: string) => {
    setInputValue(value);
    const emails = value
      .split(",")
      .map((email: string) => email.trim())
      .filter((email: string) => email !== "");
    setEmailsList(emails);

    if (emails.length == 0) {
      setIsDisabled(true);
      setError("");
      return;
    }

    for (const email of emails) {
      const emailValidation = userEditParamsSchema.shape.email.safeParse(email);
      if (!emailValidation.success) {
        setError(`Invalid emails: ${email}`);
        setIsDisabled(true);
        return;
      }
    }
    setError("");
    setIsDisabled(false);
  };

  const handleAddSubmit = async () => {
    const parsedEmails = userEmailsSchema.safeParse({
      emails: emailsList,
    });

    if (!parsedEmails.success) {
      setError(`Validation error: ${parsedEmails.error.issues[0].message}`);
      return;
    }

    try {
      const data = await postUserInvites(emailsList, organizationId);
      console.log(JSON.stringify(data));
      if (data.success) {
        setInfoMessage(emailsList);
        setInviteSuccessful(true);
      } else {
        if (data.statusCode == 422) {
          const email = data.message.split(": ")[1];
          setError(
            `${email} could not be invited because they are in the workspace`,
          );
          setInfoMessage([email]);
        } else {
          setError(data.message);
        }
        setInviteSuccessful(false);
      }
    } catch (err) {
      setInfoMessage([err]);
    }
    setInputValue("");
    setEmailsList([]);
    setError("");
    setInfoModalOpen(true);
    setIsDisabled(true);
    onClose();
  };

  const handleCancel = () => {
    onClose();
    setInputValue("");
    setError("");
    setEmailsList([]);
    setIsDisabled(true);
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        style={{
          content: {
            width: "700px",
            height: "400px",
            margin: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            background: "#fff",
            overflow: "hidden",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1010,
          },
        }}
      >
        <div className="text-3xl font-bold pt-2 pb-6">Invite Users</div>
        <div className="text-xl font-bold">Manually add users</div>
        <div className="pt-3 pb-5 pr-10">
          You can manually add users to your organization by entering their
          email addresses below. You can enter multiple email addresses
          separated by commas.
        </div>

        <label htmlFor="emails"></label>
        <textarea
          className="bg-customLightGrey text-gray-900 rounded-lg focus:ring-customLightGrey focus:border-customLightGrey block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customLightGrey"
          id="name"
          value={inputValue}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          placeholder="johndoe@gmail.com"
          style={{
            width: "400px",
            height: "100px",
            paddingLeft: "10px",
            resize: "none",
            overflow: "auto",
          }}
        />
        {error && <div className="text-customRed">{error}</div>}
        <div className="pt-1.5">
          <button
            className="text-white bg-customGrey hover:bg-customGrey hover:shadow-lg font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2 dark:bg-customGrey dark:hover:bg-customGrey focus:outline-none dark:focus:ring-customGrey"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`text-white bg-customBrown shadow hover:shadow-lg hover:bg-customBrown focus:ring-4 focus:ring-customBrown font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2 dark:bg-customBrown dark:hover:customBrown focus:outline-none dark:focus:ring-customBrown ${
              isDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleAddSubmit}
            disabled={isDisabled}
          >
            Send
          </button>
        </div>
      </ReactModal>
      <InfoModal
        onInfoModalOpen={isInfoModalOpen}
        onInfoModalClose={() => setInfoModalOpen(false)}
        isInviteModal={true}
        isSuccessful={isInviteSuccessful}
        message={infoMessage}
        onInviteMoreUsers={onAddMoreUsers}
      ></InfoModal>
    </>
  );
};

export default UsersModal;
