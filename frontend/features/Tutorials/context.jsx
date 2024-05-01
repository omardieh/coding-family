import { createContext, useContext, useState } from "react";

const TutorialsContext = createContext();

export const useTutorialsContext = () => useContext(TutorialsContext);

export default function TutorialsProvider({ children }) {
  const [tutorials, setTutorials] = useState([]);
  const [quickFilter, setQuickFilter] = useState({
    activeField: "title",
    isAscending: true,
  });
  const [searchInput, setSearchInput] = useState("");

  return (
    <TutorialsContext.Provider
      value={{
        tutorials,
        setTutorials,
        quickFilter,
        setQuickFilter,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </TutorialsContext.Provider>
  );
}
