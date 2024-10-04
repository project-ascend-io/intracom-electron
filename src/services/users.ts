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
      console.log("RESPONSE", JSON.stringify(response.status));
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
  state: string,
  organizationId: string,
  inviteId: string,
): Promise<any> => {
  console.log("State", state, "orgID", organizationId, "id", inviteId);
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
          state,
        }),
      },
    );
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
