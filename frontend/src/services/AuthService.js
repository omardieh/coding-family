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

  verifyEmail = (requestBody) => {
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("emailVerifyToken")}`,
      },
    };
    return this.api.post("/auth/verify/email", requestBody, requestHeaders);
  };
}

const authService = new AuthService();

export default authService;
