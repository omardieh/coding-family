import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
    });
    this.api.defaults.withCredentials = true;
    this.api.defaults.headers.common["Access-Control-Allow-Headers"] =
      "Authorization";
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = token;
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
    return this.api.get("/auth/token/verify");
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

  getUserInfo = () => {
    return this.api.get("/user/profile");
  };

  updateUserInfo = (reqBody) => {
    return this.api.patch("/user/profile", reqBody);
  };
}

const authService = new AuthService();

export default authService;
