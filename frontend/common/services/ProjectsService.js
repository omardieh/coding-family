import axios from "axios";

class ProjectsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createProject = (requestBody) => {
    return this.api.post("/api/projects", requestBody);
  };

  getAllProjects = () => {
    return this.api.get("/api/projects");
  };

  getProject = (id) => {
    return this.api.get(`/api/projects/${id}`);
  };

  updateProject = (id, requestBody) => {
    return this.api.put(`/api/projects/${id}`, requestBody);
  };

  deleteProject = (id) => {
    return this.api.delete(`/api/projects/${id}`);
  };
}

const projectsService = new ProjectsService();

export default projectsService;
