import "./index.css";
import "/common/assets/fonts/MontserratAlt1-Light.ttf";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {
  AuthProvider,
  CaptchaProvider,
  CsrfProvider,
} from "/features/Auth/context";
import { SocketProvider } from "/common/contexts";
import { TutorialsProvider } from "/features/Tutorials/context";
import { StyleSheetManager } from "styled-components";
import { UserProvider } from "/features/User/context";
import useBrowserAgent from "./analytics/BrowserAgent";

useBrowserAgent();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StyleSheetManager>
    <Router>
      <CsrfProvider>
        <CaptchaProvider>
          <AuthProvider>
            <SocketProvider>
              <UserProvider>
                <TutorialsProvider>
                  <App />
                </TutorialsProvider>
              </UserProvider>
            </SocketProvider>
          </AuthProvider>
        </CaptchaProvider>
      </CsrfProvider>
    </Router>
  </StyleSheetManager>
);

// serviceWorker.unregister();
