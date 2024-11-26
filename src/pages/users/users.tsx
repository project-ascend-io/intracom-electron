import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../context/auth-context";
import {
  fetchUsers,
  updateInviteState,
  deleteUserInvite,
} from "../../services/users";

import UsersModal from "./AddUsersModal";
import { UserEditParamsType } from "../../types/users";

const Users = () => {
  const [userInvites, setUserInvites] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [emailValues, setEmailValues] = useState<Record<string, string>>({});
  const [selectedInvite, setSelectedInvite] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const organizationId = user.organization._id;

  const handleEdit = (id: string) => {
    setSelectedInvite("");
    setEditItem(id);
    setSelectedState("");
  };

  const toggleDropDownMenu = (id: string) => {
    setSelectedInvite((prev) => (prev === id ? "" : id));
  };

  // Attach and detach event listener
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSelectedInvite("");
      }
    };

    if (selectedInvite !== "") {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedInvite]);

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
  }, [organizationId, editItem, isModalOpen]);

  return (
    // <div className="flex-grow mx-auto align-middle text-left p-4 pr-8">
    // <div className="flex flex-row">
    <div>
      {/* <div className="basis-2/3 border-fixed"> */}
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold pt-8 pl-8">Manage Users</div>
        <div className="pt-8">
          <button
            onClick={(e) => {
              setModalOpen(true);
            }}
            type="button"
            className="text-white bg-customBrown shadow hover:shadow-lg hover:bg-customBrown focus:ring-4 focus:ring-customBrown font-bold rounded-lg text-sm px-1 py-2.5 me-2 mb-2 dark:bg-customBrown focus:outline-none w-28 ml-4"
          >
            Invite Users
          </button>
        </div>
      </div>

      <UsersModal
        organizationId={organizationId}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddMoreUsers={() => setModalOpen(true)}
      />
      <div className="pl-8 pt-6 pb-4">
        <table className="table-auto w-full rounded-2xl border-separate border-spacing-0 border-2  border-black ">
          <thead className="text-m font-bold border-b  border-black">
            <tr>
              <th className="px-4 py-2 border-b border-black">Username</th>
              <th className="px-4 py-2 border-b border-black">Email</th>
              <th className="px-4 py-2 border-b border-black">Status</th>
              <th className="px-4 py-2 border-b border-black">Expiration</th>
              <th className="px-4 py-2 border-b border-black"></th>
            </tr>
          </thead>
          <tbody>
            {userInvites?.map((userInvite) => (
              <tr key={userInvite.invite._id}>
                <td className="px-4 py-2 border-b border-black">
                  {userInvite.user?.username || "------"}
                </td>
                {editItem == userInvite.invite._id ? (
                  <td className="px-4 py-2 border-b border-black">
                    <input
                      className={`w-full focus:outline-none  focus:ring-yellow-500 rounded border-4 border-yellow-500`}
                      id={userInvite.invite.id}
                      placeholder={userInvite.invite.email}
                      type="text"
                      value={emailValues[userInvite.invite._id]}
                      onChange={(e) =>
                        handleEmailChange(userInvite.invite._id, e.target.value)
                      }
                    />
                  </td>
                ) : (
                  <td className="px-4 py-2 border-b border-black">
                    {userInvite.invite.email}
                  </td>
                )}

                {editItem == userInvite.invite._id ? (
                  <td className="px-4 py-2 border-b border-black">
                    <select
                      className={`w-full focus:outline-none  focus:ring-yellow-500 rounded border-4 border-yellow-500`}
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
                  <td className="px-4 py-2 border-b border-black">
                    {userInvite.invite.state}
                  </td>
                )}

                <td className="px-4 py-2 border-b border-black">
                  {userInvite.invite?.expires_in
                    ? normalizeDate(userInvite.invite.expires_in)
                    : "------"}
                </td>

                <td className="px-4 py-2 border-b border-black">
                  <div
                    className="relative inline-block text-left pl-48"
                    ref={dropdownRef}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {editItem && editItem == userInvite.invite._id ? (
                      <button
                        onClick={() => handleSave(userInvite.invite?._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          toggleDropDownMenu(userInvite.invite._id)
                        }
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

                    {selectedInvite === userInvite.invite._id && (
                      <div className="absolute left-full ml-1 top-0 w-28 bg-white border border-black rounded-lg shadow-lg z-10 dropdown-menu">
                        <ul className="py-1">
                          {(userInvite.invite.state == "Pending" ||
                            userInvite.invite.state == "Denied") && (
                            <li
                              className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleEdit(userInvite.invite._id)}
                              // onClick={() => console.log("Edit clicked")}
                            >
                              Edit
                            </li>
                          )}
                          {(userInvite.invite.state == "Pending" ||
                            userInvite.invite.state == "Denied" ||
                            userInvite.invite.state == "Expired") && (
                            <li
                              className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer"
                              onClick={() => console.log("Resend clicked")}
                            >
                              Resend
                            </li>
                          )}
                          <li
                            className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log("Delete clicked")}
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>

                {/* <td className=" text-center">
                  {editItem && editItem == userInvite.invite._id ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleEdit(userInvite.invite._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-b border-solid border-black px-4 py-2"
                    >
                      Edit
                    </button>
                  )}
                </td> */}

                {/* <td className=" text-center">
                  {editItem && editItem == userInvite.invite._id && (
                    <button
                      onClick={() => {
                        handleSave(userInvite.invite);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-b border-solid border-black px-4 py-2"
                    >
                      Save
                    </button>
                  )}
                </td> */}

                {/* <td className=" text-center">
                  {editItem && editItem == userInvite.invite._id ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleDelete(userInvite.invite)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-b border-solid border-black px-4 py-2"
                    >
                      Delete
                    </button>
                  )}
                </td> */}

                {/* <td className=" text-center">
                  {editItem && editItem == userInvite.invite._id ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleResend(userInvite.invite._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-b border-solid border-black px-4 py-2"
                    >
                      Resend
                    </button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>{isError ? errorMsg : successMsg} </p>
      {/* </div> */}
    </div>
  );
};

export default Users;
