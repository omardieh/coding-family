import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "/common/services/AuthService";
import { LoadingSpinner } from "/common/components";
import { useUserContext } from "/features/user-section/context";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setUserInfo } = useUserContext();

  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUserInfo(null);
      return;
    }
    try {
      const responseVerify = await AuthService.verifyToken();
      if (responseVerify.status === 200) {
        const userInfo = await AuthService.getUserInfo();
        setUserInfo(userInfo.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserInfo(null);
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      console.error(error, "Unexpected error occurred during authentication.");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const logUserOut = async () => {
    await AuthService.logout();
    localStorage.removeItem("accessToken");
    authenticateUser();
  };

  const updateUserInfo = (reqBody) => {
    AuthService.updateUserInfo(reqBody)
      .then((updatedUser) => {
        setUserInfo(updatedUser.data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        storeToken,
        authenticateUser,
        logUserOut,
        updateUserInfo,
        errorMessage,
        setErrorMessage,
      }}
    >
      {isLoading ? <LoadingSpinner /> : props.children}
    </AuthContext.Provider>
  );
};
