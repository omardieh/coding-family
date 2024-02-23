import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
  };

  verifyToken = () => {
    return this.api.get("/auth/verify/token");
  };

  verifyEmail = ({ userID, token, code }) => {
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.api.post(
      "/auth/verify/email",
      { userID, code },
      requestHeaders
    );
  };
}

const authService = new AuthService();

export default authService;
