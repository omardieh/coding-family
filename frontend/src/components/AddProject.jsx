import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };
    const requestHeaders = {
      headers: { Authorization: `Bearer ${storedToken}` },
    };

    axios
      .post(`${API_URL}/api/projects`, requestBody, requestHeaders)
      .then((response) => {
        setTitle("");
        setDescription("");
        props.refreshProjects();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="AddProject">
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;
