const projectRouter = require("express").Router();
const { mongoError } = require("../../helpers/mongoError.helper");
const Project = require("../../models/Project.model");

projectRouter.get("/", (req, res) => {
  Project.find()
    .populate("tasks")
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

projectRouter.post("/", (req, res) => {
  const { title, description } = req.body;
  Project.create({ title, description, tasks: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

projectRouter.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  if (mongoError(projectId)) return;
  Project.findById(projectId)
    .populate("tasks")
    .then((project) => res.status(200).json(project))
    .catch((error) => res.json(error));
});

projectRouter.put("/:projectId", (req, res) => {
  const { projectId } = req.params;
  if (mongoError(projectId)) return;
  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((error) => res.json(error));
});

projectRouter.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  if (mongoError(projectId)) return;
  Project.findByIdAndRemove(projectId)
    .then(() =>
      res.json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = projectRouter;
