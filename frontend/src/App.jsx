import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT

import Navbar from "./components/Navbar"; // <== IMPORT
import HomePage from "./pages/HomePage"; // <== IMPORT
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Verification from "./pages/verification";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects"
          element={
            <IsPrivate>
              <Projects />
            </IsPrivate>
          }
        >
          <Route
            path="/projects/:projectId"
            element={
              <IsPrivate>
                <ProjectDetailsPage />
              </IsPrivate>
            }
          />
          <Route
            path="/projects/edit/:projectId"
            element={
              <IsPrivate>
                <EditProjectPage />
              </IsPrivate>
            }
          />
        </Route>

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
