import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default");
  const multipleValues = {
    themeState: [theme, setTheme],
  };

  return (
    <ThemeContext.Provider value={multipleValues}>
      {children}
    </ThemeContext.Provider>
  );
};
