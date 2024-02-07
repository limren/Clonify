import { jwtDecode } from "jwt-decode";

export const decodeAndVerifyJwtToken = async (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (e) {
    console.error("Error occurred while decoding token : " + e);
    return null;
  }
};
