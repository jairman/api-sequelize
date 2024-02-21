import { Task } from "./../models/Task.js";
import { Project } from "./../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    //throw  new Error("Method not implemented.");
    const project = await Project.findAll();
    return res.status(200).json({ projects: project });
  } catch (error) {
    console.log("Error getting projects", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  await Project.findOne({ where: { id: id } })
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: "Not found." });
      }

      return res.status(200).json({ project: project });
    })
    .catch((err) => {
      console.log("Error getting project", err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

export const createProject = async (req, res) => {
  const { name, priority, description } = req.body;

  const newProject = await Project.create({ name, priority, description })
    .then((project) => {
      console.log(`Created project: ${project}`);
      return res.status(201).json(project);
    })
    .catch((error) => {
      console.error("Error creating project", error);
      return res.status(400).json({
        message: "Unable to process request",
        error,
      });
    });
};

export const updateProject = async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  await Project.update(updates, { where: { id: id } }).then((updated) => {
    if (updated[0] > 0) {
      return res.status(200).json({ updated: updated });
    } else {
      return res.status(404).json({ message: "Project Not Found!" });
    }
  });
};

// DELETE /projects/:id -> delete a specific project by its id
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const deletedRowsCount = await Project.destroy({
      where: { id: Number(id) },
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "No such project found" });
    } else {
      return res.status(200).send();
    }
  } catch (err) {
    console.error("Failed to delete the project", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProjectTasks = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findAll({ where: { projectId: id } }).then((data) => {
      if (!data) {
        return res.status(404).json({ message: "No tasks for this project" });
      } else {
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
