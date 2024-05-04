import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "/common/services/AuthService";
import Loading from "/features/Loading";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

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
      setUser(null);
      return;
    }
    try {
      const responseVerify = await AuthService.verifyToken();
      if (responseVerify.status === 200) {
        const userInfo = await AuthService.getUserInfo();
        setUser(userInfo.data);
        setIsLoggedIn(true);
        setIsLoading(false);
      } else if (
        responseVerify.status === 401 &&
        responseVerify.data === "Access Denied. Token expired"
      ) {
        await refreshTokenAndRetry();
      } else {
        handleUnexpectedError();
      }
    } catch (error) {
      handleUnexpectedError();
    }

    async function refreshTokenAndRetry() {
      try {
        const responseRefresh = await AuthService.refreshToken();
        if (responseRefresh.status === 200) {
          const userInfo = await AuthService.getUserInfo();
          setUser(userInfo.data);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          handleUnexpectedError();
        }
      } catch (error) {
        handleUnexpectedError();
      }
    }

    function handleUnexpectedError() {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      console.error("Unexpected error occurred during authentication.");
      setErrorMessage("An unexpected error occurred. Please try again later.");
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
        setUser(updatedUser.data);
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
        user,
        storeToken,
        authenticateUser,
        logUserOut,
        updateUserInfo,
        errorMessage,
        setErrorMessage,
      }}
    >
      {isLoading ? <Loading /> : props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuthContext };
