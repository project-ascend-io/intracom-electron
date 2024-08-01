import { LoginFormType } from "../types/login";
import { ResponseObject } from "../types/auth";

//TODO: update base url with backend route
const BASE_URL = "http://localhost:8080";

//TODO: update returns type with response object typescript schema
/**
 * Login user
 * @param {object} loginInfo - An object containing the user email and password
 * @returns {ResponseObject} The response from the server
 */
export const loginUser = async (loginInfo: LoginFormType): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(`Failed to login user ${response.status}:`, errorBody);
      return errorBody;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("loginUser error:", error);

    throw error;
  }
};

/**
 * Check user session
 * @returns {ResponseObject} Response from the server containing user object
 */
export const checkUser = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(`Failed to get user ${response.status}:`, errorBody);
      return errorBody;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("checkUser error:", error);

    throw error;
  }
};

/**
 * Logout user
 * @param {string} userId - A string containing user's unique ID
 * @returns {ResponseObject} The response from the server
 */
export const logoutUser = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(`Failed to logout user ${response.status}:`, errorBody);
      return errorBody;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("logoutUser error:", error);

    throw error;
  }
};
