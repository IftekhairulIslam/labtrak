import axios from "axios";
import { BASE_URL } from "../configuration/config";

const httpService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handling unauthenticated access
httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      removeHeaderToken();
    }
    return Promise.reject(error);
  },
);

// Set header when logged in successful
function setHeaderToken(token: string) {
  httpService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Remove header when logged out
function removeHeaderToken() {
  delete httpService.defaults.headers.common["Authorization"];
}

export { removeHeaderToken, setHeaderToken };
export default httpService;
