import "./main.css";
import "/common/assets/fonts/MontserratAlt1-Light.ttf";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {
  AuthProvider,
  CaptchaProvider,
  CsrfProvider,
} from "../features/auth-flow/context";
import { SocketProvider } from "/common/contexts";
import { TutorialsProvider } from "../features/tutorials/context";
import { StyleSheetManager } from "styled-components";
import { UserProvider } from "../features/user-section/context";
import { AnalyticsService } from "/common/services";

const { initialize } = AnalyticsService();
initialize();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StyleSheetManager>
    <Router>
      <CsrfProvider>
        <CaptchaProvider>
          <SocketProvider>
            <UserProvider>
              <AuthProvider>
                <TutorialsProvider>
                  <App />
                </TutorialsProvider>
              </AuthProvider>
            </UserProvider>
          </SocketProvider>
        </CaptchaProvider>
      </CsrfProvider>
    </Router>
  </StyleSheetManager>
);

// serviceWorker.unregister();
