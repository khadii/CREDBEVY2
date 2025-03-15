import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  exp: number; // Expiration timestamp
  [key: string]: any; // Other claims
}

export const isTokenValid = (token: any): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime; 
  } catch (error) {
    return false;
  }
};

export const isTokenConsistent = (cookieToken: string | undefined, stateToken: string | null): boolean => {
    return !!cookieToken && !!stateToken && cookieToken === stateToken;
  };

