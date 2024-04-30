import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const useThemeContext = () => useContext(ThemeContext);

function ThemeProvider(props) {
  const [theme, setTheme] = useState("default");
  const multipleValues = {
    themeState: [theme, setTheme],
  };
  return (
    <ThemeContext.Provider value={multipleValues}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, useThemeContext };
