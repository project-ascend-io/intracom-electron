import React from "react";
import ReactModal from "react-modal";
import { deleteUserInvite } from "../../services/users";

interface DeleteModalProps {
  onDeleteModalOpen: boolean;
  onDeleteModalClose: () => void;
  email: string;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onDeleteModalOpen,
  onDeleteModalClose,
  email,
  onDelete,
}) => {
  return (
    <ReactModal
      isOpen={onDeleteModalOpen}
      onRequestClose={onDeleteModalClose}
      ariaHideApp={false}
      style={{
        content: {
          width: "500px",
          height: "200px",
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
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1010,
        },
      }}
    >
      <div className="text-2xl font-bold pt-2 pb-6 pl-6 pr-6 text-center">
        Are you sure you want to delete
        <span className="italic"> "{email}"?</span>
      </div>
      <div className="text-center space-x-4">
        <button
          className="text-white bg-customGrey hover:bg-customGrey hover:shadow-lg font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2 dark:bg-customGrey dark:hover:bg-customGrey focus:outline-none dark:focus:ring-customGrey"
          onClick={onDeleteModalClose}
        >
          Cancel
        </button>
        <button
          className="text-white bg-customRed2 hover:bg-customRed2 hover:shadow-lg font-bold rounded-lg text-m px-5 py-2.5 me-2 mb-2 dark:bg-customRed2 dark:hover:bg-customRed2 focus:outline-none dark:focus:ring-customRed2"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
