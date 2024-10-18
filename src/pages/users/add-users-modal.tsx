import React, { useState } from "react";
import { postUserInvites } from "../../services/users";
import ReactModal from "react-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userEmailsSchema } from "../../types/users";

interface UsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
}

const UsersModal: React.FC<UsersModalProps> = ({
  isOpen,
  onClose,
  organizationId,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddSubmit = async () => {
    const emailsList = inputValue.split(",").map((email) => email.trim());

    const parsedEmails = userEmailsSchema.safeParse({
      emails: emailsList,
    });

    console.log("PARSED EMAILS", parsedEmails);

    if (!parsedEmails.success) {
      setError(`Validation error: ${parsedEmails.error.issues[0].message}`);
      console.log("Error", error);
      return;
    }

    try {
      const data = await postUserInvites(emailsList, organizationId);
      console.log(JSON.stringify(data));
      if (data.success) {
        setSuccessMsg(data.message);
      } else {
        setError(data.message);
      }

      console.log("Error", error);
      console.log("Success", successMsg);

      console.log("RESPONSE", JSON.stringify(data));
    } catch (err) {
      console.log("Error sending user invites", err);
    }
  };
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div>Invite Users</div>
      <div>Manually add users</div>
      <div>
        You can manually add users to your organization by entering their email
        addresses below. You can enter multiple email addresses separated by
        comma.
      </div>

      <label htmlFor="emails"></label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="name"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="johndoe@gmail.com"
      ></input>
      {error && <p>{error}</p>}
      {successMsg && <p>{successMsg}</p>}
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleAddSubmit}
      >
        Invite Users
      </button>
    </ReactModal>
  );
};

export default UsersModal;
