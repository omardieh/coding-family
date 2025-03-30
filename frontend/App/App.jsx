import { ToastContainer } from "react-toastify";
import RenderRoutes from "./routes";
import Theme from "/features/global-layout/theme";
import { ErrorProvider } from "/features/error-boundaries/context";
import { ErrorBoundary } from "/features/error-boundaries/components";

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
