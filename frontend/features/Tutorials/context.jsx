import { createContext, useContext, useState } from "react";

const TutorialsContext = createContext();

export const useTutorialsContext = () => useContext(TutorialsContext);

export default function TutorialsProvider({ children }) {
  const [tutorials, setTutorials] = useState([]);

  return <TutorialsContext.Provider>{children}</TutorialsContext.Provider>;
}
