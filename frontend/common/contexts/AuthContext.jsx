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

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setIsLoggedIn(true);
      AuthService.verifyToken()
        .then((response) => {
          if (response.statusText === "OK") return AuthService.getUserInfo();
        })
        .then((foundUser) => {
          setUser(foundUser.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
          console.error("authenticateUser", error.message);
          setErrorMessage(error.response.data);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("accessToken");
    authenticateUser();
  };

  const getUserInfo = () => {
    AuthService.getUserInfo().then((foundUser) => {
      setUser(foundUser.data);
    });
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
        logOutUser,
        getUserInfo,
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
