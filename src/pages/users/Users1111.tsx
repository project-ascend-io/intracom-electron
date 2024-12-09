import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../context/auth-context";
import {
  fetchUsers,
  updateInviteState,
  deleteUserInvite,
} from "../../services/users";

import UsersModal from "./AddUsersModal";
import DeleteModal from "./DeleteModal";
import InfoModal from "./InfoModal";
import { UserEditParamsType } from "../../types/users";

const Users = () => {
  const [userInvites, setUserInvites] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isAddUsersModalOpen, setAddUsersModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [emailValues, setEmailValues] = useState<Record<string, string>>({});

  const [selectedInvite, setSelectedInvite] = useState(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  type Invite = {
    _id: string;
    [key: string]: any;
  };

  const { user } = useAuth();
  const organizationId = user.organization._id;

  const handleEdit = (invite: any) => {
    setSelectedInvite(invite);
    setEditItem(invite._id);
    setSelectedState("");
  };

  const toggleDropDownMenu = (invite: Invite) => {
    setDropDownOpen(!isDropDownOpen);

    setSelectedInvite(invite);
  };

  const handleEmailChange = (id: string, newEmail: string) => {
    const updatedEmailValues = { ...emailValues, [id]: newEmail };

    setEmailValues(updatedEmailValues);
  };

  const handleSave = (inviteId: string) => {
    const params: UserEditParamsType = {};
    if (selectedState) {
      params.state = selectedState;
    }
    if (emailValues[inviteId]) {
      params.email = emailValues[inviteId];
    } else {
      setEditItem("");
      setSelectedInvite(null);
      setDropDownOpen(false);
      return;
    }

    updateState(params, organizationId, inviteId);
  };

  const updateState = async (
    params: UserEditParamsType,
    organizationId: string,
    inviteId: string,
  ) => {
    try {
      const data = await updateInviteState(params, organizationId, inviteId);
      if (!data.success) {
        setIsError(true);
        setErrorMessage("Error updating user invite: " + data.message);
        setInfoModalOpen(true);
      } else {
        setIsError(false);
        setSuccessMsg(
          `User invite with email ${selectedInvite.email} is updated`,
        );
        setInfoModalOpen(true);
      }
      setEditItem("");
      setSelectedInvite(null);
      setDropDownOpen(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error updating user invite: " + error.message);
      setInfoModalOpen(true);
    }
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
    deleteInvite(organizationId, selectedInvite._id);
  };

  const deleteInvite = async (organizationId: string, id: string) => {
    try {
      const statusCode = await deleteUserInvite(organizationId, id);
      if (statusCode === 204) {
        setIsError(false);
        setSuccessMsg(
          `User invite ${selectedInvite.email} successfully deleted`,
        );
        setDeleteModalOpen(false);
        setInfoModalOpen(true);
      } else {
        setIsError(true);
        setErrorMessage("User invite was not found");
      }
      setSelectedInvite(null);
    } catch (error) {
      setIsError(true);

      setDeleteModalOpen(false);
      setInfoModalOpen(true);
      setErrorMessage("Error deleting user invite: " + error.message);
    }
  };

  const handleResend = (id: string) => {
    const params: UserEditParamsType = {};
    params.state = "Pending";
    updateState(params, organizationId, id);
  };

  const normalizeDate = (isostring: any) => {
    const date = new Date(isostring);

    const normalizedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return normalizedDate;
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(organizationId);
        setUserInvites(data.responseObject);

        const initialEmails: { [key: string]: string } = {};
        for (const invite of userInvites) {
          initialEmails[invite.invite._id] = invite.invite.email;
        }
        setEmailValues(initialEmails);
      } catch (error: any) {
        setIsError(true);
        setErrorMessage("Error fetching user invites: " + error.message);
      }
    };

    getUsers();
  }, [
    organizationId,
    editItem,
    isAddUsersModalOpen,
    isDeleteModalOpen,
    isInfoModalOpen,
  ]);

  return (
    <div className="w-full overflow-auto">
      <div className="flex justify-between">
        <div className="text-2xl font-bold pt-12 pl-8">Manage Users</div>
        <div className="pt-12 pr-12">
          <button
            onClick={(e) => {
              setAddUsersModalOpen(true);
            }}
            type="button"
            className="text-white bg-customBrown shadow hover:shadow-lg hover:bg-customBrown focus:ring-4 focus:ring-customBrown font-bold rounded-lg text-sm p-3 dark:bg-customBrown focus:outline-none w-1/16"
          >
            Invite Users
          </button>
        </div>
      </div>

      <UsersModal
        organizationId={organizationId}
        isOpen={isAddUsersModalOpen}
        onClose={() => setAddUsersModalOpen(false)}
        onAddMoreUsers={() => setAddUsersModalOpen(true)}
      />
      <div className="pl-5 pt-8 pr-12 pb-6">
        <table className="table-auto w-full rounded-2xl border-separate border-spacing-0 border-2  border-black">
          <thead className="font-bold border-b  border-black">
            <tr>
              <th className="px-4 py-6 border-b text-left border-black">
                Username
              </th>
              <th className="px-4 py-6 border-b text-left border-black">
                Email
              </th>
              <th className="px-4 py-6 border-b text-left border-black">
                Status
              </th>
              <th className="px-4 py-6 border-b text-left border-black">
                Expiration
              </th>
              <th className="px-4 py-6 border-b text-left border-black"></th>
            </tr>
          </thead>
          <tbody>
            {userInvites && userInvites.length > 0 ? (
              userInvites?.map((userInvite) => (
                <tr key={userInvite.invite._id}>
                  <td className="px-4 py-2 border-t border-black">
                    {userInvite.user?.username || "------"}
                  </td>
                  {editItem == userInvite.invite._id ? (
                    <td className="px-4 py-2 border-t border-black">
                      <input
                        className={`w-full p-1 focus:outline-none  focus:ring-yellow-500 rounded border-2 border-yellow-500`}
                        id={userInvite.invite.id}
                        placeholder={userInvite.invite.email}
                        type="text"
                        value={emailValues[userInvite.invite._id]}
                        onChange={(e) =>
                          handleEmailChange(
                            userInvite.invite._id,
                            e.target.value,
                          )
                        }
                      />
                    </td>
                  ) : (
                    <td className="px-4 py-2 border-t border-black">
                      {userInvite.invite.email}
                    </td>
                  )}

                  {editItem == userInvite.invite._id ? (
                    <td className="px-4 py-2 border-t border-black">
                      <select
                        className={`w-full p-1 focus:outline-none  focus:ring-yellow-500 rounded border-2 border-yellow-500`}
                        value={selectedState || userInvite.invite.state}
                        onChange={(e) => {
                          setSelectedState(
                            e.target.value || userInvite.invite.state,
                          );
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Denied">Denied</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </td>
                  ) : (
                    <td className="px-4 py-2 border-t border-black">
                      {userInvite.invite.state}
                    </td>
                  )}

                  <td className="px-4 py-2 border-t border-black">
                    {userInvite.invite?.expires_in
                      ? normalizeDate(userInvite.invite.expires_in)
                      : "------"}
                  </td>

                  <td className="px-4 py-2 border-t border-black">
                    <div
                      className="relative inline-block text-left pl-48"
                      ref={dropdownRef}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {editItem && editItem == userInvite.invite._id ? (
                        <button
                          className="text-customBrown bg-white shadow hover:shadow-lg hover:bg-white font-bold rounded-lg text-m px-5 py-2.5 mb-2 mt-2"
                          style={{
                            outline: "2px solid #C18119",
                          }}
                          onClick={() => handleSave(userInvite.invite?._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleDropDownMenu(userInvite.invite)}
                          className="text-gray-600 p-2 rounded-full hover:bg-gray-200 focus:outline-none "
                        >
                          <div className="flex flex-col space-y-0.5">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <svg
                                key={index}
                                className="w-2 h-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 10"
                              >
                                <circle
                                  cx="5"
                                  cy="5"
                                  r="2"
                                  fill="white"
                                  stroke="black"
                                  strokeWidth="2"
                                />
                              </svg>
                            ))}
                          </div>
                        </button>
                      )}

                      {selectedInvite === userInvite.invite &&
                        isDropDownOpen && (
                          <div className="absolute left-[70px] top-1 w-28 bg-white border border-black rounded-lg shadow-lg z-10 dropdown-menu">
                            <ul className="py-1">
                              {(userInvite.invite.state == "Pending" ||
                                userInvite.invite.state == "Denied") && (
                                <li
                                  className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleEdit(userInvite.invite)}
                                >
                                  Edit
                                </li>
                              )}
                              {(userInvite.invite.state == "Pending" ||
                                userInvite.invite.state == "Denied" ||
                                userInvite.invite.state == "Expired") && (
                                <li
                                  className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleResend(userInvite.invite._id)
                                  }
                                >
                                  Resend
                                </li>
                              )}
                              <li
                                className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setDropDownOpen(false);
                                  setDeleteModalOpen(true);
                                }}
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center pt-36 pb-36 text-m font-bold"
                >
                  <p>No users found.</p>
                  <p>Click on 'Invite Users' to begin inviting users.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteModalOpen={isDeleteModalOpen}
          onDeleteModalClose={() => setDeleteModalOpen(false)}
          email={selectedInvite?.email}
          onDelete={handleDelete}
        ></DeleteModal>
      )}
      <InfoModal
        onInfoModalOpen={isInfoModalOpen}
        onInfoModalClose={() => setInfoModalOpen(false)}
        isSuccessful={!isError}
        isInviteModal={false}
        message={!isError ? [successMsg] : [errorMsg]}
      ></InfoModal>
    </div>
  );
};

export default Users;
