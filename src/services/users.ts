import { UserEditParamsType } from "../types/users";

const Base_URL = process.env.API_URL;

export const fetchUsers = async (organizationId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${Base_URL}/organizations/${organizationId}/user-invites`,
      {
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to get users for organization id: ${organizationId}`,
      );
    }
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      return null;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateInviteState = async (
  params: UserEditParamsType,
  organizationId: string,
  inviteId: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${Base_URL}/organizations/${organizationId}/user-invites/${inviteId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...(params.state && { state: params.state }),
          ...(params.email && { email: params.email }),
        }),
      },
    );
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postUserInvites = async (
  emails: string[],
  organizationId: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${Base_URL}/organizations/${organizationId}/user-invites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          emails,
        }),
      },
    );

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteUserInvite = async (
  organizationId: string,
  inviteId: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${Base_URL}/organizations/${organizationId}/user-invites/${inviteId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    return response.status;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Error deleting user invite: " + err.message);
    } else {
      throw new Error("Error deleting user invite: An unknown error occurred");
    }
  }
};
