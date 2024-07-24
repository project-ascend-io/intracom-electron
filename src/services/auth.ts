import { LoginFormType } from "../pages/login/types/login";

//TODO: update base url with backend route
const BASE_URL = "http://localhost:8080/";

/**
 * Login user
 * @param {object} loginInfo - An object containing the user email and password
 * @returns {Promise<any>} The response from the server.
 */
export const loginUser = async (loginInfo: LoginFormType): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      //TODO: Would be good to display this error within the form, this is fine for now
      throw new Error(`Failed to login user: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("loginUser error:", error);

    throw error;
  }
};
