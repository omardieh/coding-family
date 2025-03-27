import { ToastContainer } from "react-toastify";

import RenderRoutes from "./routes";
import Theme from "/features/Theme";
import { ErrorProvider } from "/features/Error/context";
import { ErrorBoundary } from "/features/Error/components";

function App() {
  return (
    <>
      <ErrorProvider>
        <ErrorBoundary>
          <Theme>
            <RenderRoutes />
            <ToastContainer />
          </Theme>
        </ErrorBoundary>
      </ErrorProvider>
    </>
  );
}

export default App;
