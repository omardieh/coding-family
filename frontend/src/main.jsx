import "./index.css";
import "./assets/fonts/MontserratAlt1-Light.ttf";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CaptchaProvider } from "./contexts/CaptchaContext";
import { SocketProvider } from "./contexts/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <CaptchaProvider>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </CaptchaProvider>
  </Router>
);
