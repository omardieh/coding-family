import "./index.css";
import "./assets/fonts/MontserratAlt1-Light.ttf";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CaptchaProvider } from "./contexts/CaptchaContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <ThemeProvider>
      <CaptchaProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CaptchaProvider>
    </ThemeProvider>
  </Router>
);
