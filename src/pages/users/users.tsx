import React, { useState, useEffect } from "react";
import LeftsideBar from "../../Components/leftside-bar/leftside-bar";
import Navbar from "../../Components/nav-bar/nav-bar";
import { useAuth } from "../../context/auth-context";
import { fetchUsers, updateInviteState } from "../../services/users";
import { setErrorMap } from "zod";
const Users = () => {
  const [userInvites, setUserInvites] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const { user } = useAuth();
  const organizationId = user.organization._id;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(organizationId);
        setUserInvites(data.responseObject);
      } catch (error: any) {
        console.error("Error fetching user invites", error);
      }
    };

    getUsers();
  }, [organizationId, editItem]);

  const handleEdit = (id: string) => {
    setEditItem(id);
  };

  const handleSave = (invite: any) => {
    if (selectedState) {
      updateState(selectedState, organizationId, invite._id);
      setSelectedState(selectedState);
    } else {
      setEditItem("");
    }
  };

  const updateState = async (
    state: string,
    organizationId: string,
    inviteId: string,
  ) => {
    try {
      const data = await updateInviteState(state, organizationId, inviteId);
      // TODO: add successful modal window
      setEditItem("");
    } catch (error) {
      console.error("Error updating user invite", error);
      // TODO: add err modal window
    }
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

  // setUserInvites((prevInvites) =>
  //   prevInvites.map((userInvite) =>
  //     userInvite._id === inviteId ? { ...user, state: state } : userInvite
  //   )
  // );
  //   };

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
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add Users
              </button>
            </caption>

            <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Expires</th>
                <th className="px-6 py-3">Created at</th>
                <th className="px-6 py-3">Updated at</th>
                <th className="px-6 py-3">Actions</th>
                {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            <tbody>
              {userInvites?.map((userInvite) => (
                <tr key={userInvite._id}>
                  <td className="px-4 py-0">{userInvite.email}</td>

                  {editItem == userInvite._id ? (
                    <td>
                      <select
                        value={selectedState || userInvite.state}
                        onChange={(e) => {
                          setSelectedState(e.target.value || userInvite.state);
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </td>
                  ) : (
                    <td className="px-4 py-0">{userInvite.state}</td>
                  )}

                  <td className="px-4 py-0">
                    {normalizeDate(userInvite.expires_in)}
                  </td>
                  <td className="px-4 py-0">
                    {normalizeDate(userInvite.createdAt)}
                  </td>
                  <td className="px-4 py-0">
                    {normalizeDate(userInvite.updatedAt)}
                  </td>
                  <td className=" text-center">
                    {editItem && editItem == userInvite._id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleEdit(userInvite._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </td>

                  <td className=" text-center">
                    {editItem && editItem == userInvite._id && (
                      <button
                        onClick={() => {
                          handleSave(userInvite);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Save
                      </button>
                    )}
                  </td>
                  <td className=" text-center">
                    {editItem && editItem == userInvite._id ? (
                      ""
                    ) : (
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Delete
                      </button>
                    )}
                  </td>
                  <td className=" text-center">
                    {editItem && editItem == userInvite._id ? (
                      ""
                    ) : (
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Resend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
