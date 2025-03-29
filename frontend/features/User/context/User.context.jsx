import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, userToken }}>
      {children}
    </UserContext.Provider>
  );
};
