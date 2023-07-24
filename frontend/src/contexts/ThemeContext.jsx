import { createContext, useState } from "react";

const ThemeContext = createContext();

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

export { ThemeProvider, ThemeContext };
