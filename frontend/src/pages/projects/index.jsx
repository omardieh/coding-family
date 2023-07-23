import { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "../../components/AddProject";
import ProjectCard from "../../components/ProjectCard";

const API_URL = "http://localhost:5005";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      <AddProject refreshProjects={getAllProjects} />
      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
}
