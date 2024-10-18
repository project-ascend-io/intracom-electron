import React, { useState, useEffect } from "react";
import LeftsideBar from "../../Components/leftside-bar/leftside-bar";
import Navbar from "../../Components/nav-bar/nav-bar";
import { useAuth } from "../../context/auth-context";
import {
  fetchUsers,
  updateInviteState,
  deleteUserInvite,
} from "../../services/users";

import UsersModal from "./add-users-modal";
import { UserEditParamsType } from "../../types/users";

const Users = () => {
  const [userInvites, setUserInvites] = useState([]);
  const [State, setEditState] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [emailValues, setEmailValues] = useState<Record<string, string>>({});

  const { user } = useAuth();
  const organizationId = user.organization._id;

  const handleEdit = (id: string) => {
    setEditItem(id);
    setSelectedState("");
  };

  const handleEmailChange = (id: string, newEmail: string) => {
    const updatedEmailValues = { ...emailValues, [id]: newEmail };

    setEmailValues(updatedEmailValues);
  };

  const handleSave = (invite: any) => {
    const params: UserEditParamsType = {};
    if (selectedState) {
      params.state = selectedState;
    }
    if (emailValues[invite._id]) {
      params.email = emailValues[invite._id];
    } else {
      setEditItem("");
      return;
    }

    updateState(params, organizationId, invite._id);
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
      } else {
        setIsError(false);
        setSuccessMsg("User invite is updated");
      }
      setEditItem("");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error updating user invite" + error.message);
      // TODO: add err modal window
    }
  };

  const handleDelete = (userInvite: any) => {
    setEditItem(userInvite._id);
    deleteInvite(organizationId, userInvite._id);
  };

  const deleteInvite = async (organizationId: string, id: string) => {
    try {
      const statusCode = await deleteUserInvite(organizationId, id);
      if (statusCode === 204) {
        setIsError(false);
        setSuccessMsg(`User Invite with id ${id} is deleted`);
      } else {
        setIsError(true);
        setErrorMessage("User invite was not found");
      }
      setEditItem("");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error deleting user invite: " + error.message);
    }
  };

  const handleResend = (id: string) => {
    setEditItem(id);
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
  }, [organizationId, editItem]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <LeftsideBar page="users" />
        <div className="basis-2/3 border-fixed">
          <table className="w-full text-sm text-center rtl:text-justify text-gray-500 dark:text-gray-400 border-separate">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              User Invites for {user.organization.name}
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                View your current user invites
              </p>
              <button
                onClick={(e) => {
                  setModalOpen(true);
                }}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Invite Users
              </button>
              <UsersModal
                organizationId={organizationId}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
              />
            </caption>

            <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Expiration</th>
                <th className="px-6 py-3">Actions</th>
                {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            <tbody>
              {userInvites?.map((userInvite) => (
                <tr key={userInvite.invite._id}>
                  <td className="px-4 py-0">
                    {userInvite.user?.username || null}
                  </td>
                  {editItem == userInvite.invite._id ? (
                    <td>
                      <input
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
                    <td className="px-4 py-0">{userInvite.invite.email}</td>
                  )}

                  {editItem == userInvite.invite._id ? (
                    <td>
                      <select
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
                    <td className="px-4 py-0">{userInvite.invite.state}</td>
                  )}

                  <td className="px-4 py-0">
                    {userInvite.invite?.expires_in
                      ? normalizeDate(userInvite.invite.expires_in)
                      : null}
                  </td>

                  <td className=" text-center">
                    {editItem && editItem == userInvite.invite._id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleEdit(userInvite.invite._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </td>

                  <td className=" text-center">
                    {editItem && editItem == userInvite.invite._id && (
                      <button
                        onClick={() => {
                          handleSave(userInvite.invite);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Save
                      </button>
                    )}
                  </td>
                  <td className=" text-center">
                    {editItem && editItem == userInvite.invite._id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleDelete(userInvite.invite)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                  <td className=" text-center">
                    {editItem && editItem == userInvite.invite._id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleResend(userInvite.invite._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Resend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{isError ? errorMsg : successMsg} </p>
        </div>
      </div>
    </div>
  );
};

export default Users;
