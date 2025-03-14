import { ToastContainer } from "react-toastify";

import RenderRoutes from "./routes";
import Theme from "/features/Theme";

function App() {
  return (
    <>
      <Theme
        title="Coding Family - Where Innovation is Home"
        description="Where Innovation is Home."
        logo="Coding Family"
      >
        <RenderRoutes />
        <ToastContainer
        // transition={{
        //   enter: "noop",
        //   exit: "noop",
        //   collapse: false,
        // }}
        />
      </Theme>
    </>
  );
}

export default App;
