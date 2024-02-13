import { jwtDecode } from "jwt-decode";
import { Payload } from "../../../shared/types/token";

export const decodeAndVerifyJwtToken = (token: string): Payload => {
  try {
    const decodedToken: Payload = jwtDecode(token);
    if (!decodedToken) {
      console.error("Error: Decoded token is null.");
      return null;
    }
    if (
      "id" in decodedToken &&
      "email" in decodedToken &&
      "role" in decodedToken
    ) {
      return decodedToken as Payload;
    } else {
      console.error("Error: Decoded token is missing required properties.");
      return null;
    }
  } catch (e) {
    console.error("Error occurred while decoding token: " + e);
    return null;
  }
};
