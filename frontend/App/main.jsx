import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "/common/assets/fonts/MontserratAlt1-Light.ttf";
import { AuthProvider } from "/common/contexts/AuthContext";
import { CaptchaProvider } from "/common/contexts/CaptchaContext";
import { SocketProvider } from "/common/contexts/SocketContext";
import TutorialsProvider from "/features/Tutorials/context";
// import * as serviceWorker from "/sw.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <CaptchaProvider>
      <AuthProvider>
        <SocketProvider>
          <TutorialsProvider>
            <App />
          </TutorialsProvider>
        </SocketProvider>
      </AuthProvider>
    </CaptchaProvider>
  </Router>
);

// serviceWorker.unregister();
