import { createContext, useContext, useState } from "react";

const TutorialsContext = createContext();

export const useTutorialsContext = () => useContext(TutorialsContext);

export default function TutorialsProvider({ children }) {
  const [tutorials, setTutorials] = useState([]);
  const [quickFilter, setQuickFilter] = useState({});

  return (
    <TutorialsContext.Provider
      value={{ tutorials, setTutorials, quickFilter, setQuickFilter }}
    >
      {children}
    </TutorialsContext.Provider>
  );
}
