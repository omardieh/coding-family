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
// import * as serviceWorker from "/sw.js";
import { StyleSheetManager } from "styled-components";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StyleSheetManager>
    <Router>
      <CsrfProvider>
        <CaptchaProvider>
          <AuthProvider>
            <SocketProvider>
              <TutorialsProvider>
                <App />
                <ToastContainer />
              </TutorialsProvider>
            </SocketProvider>
          </AuthProvider>
        </CaptchaProvider>
      </CsrfProvider>
    </Router>
  </StyleSheetManager>
);

// serviceWorker.unregister();
