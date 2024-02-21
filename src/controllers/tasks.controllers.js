import { Task } from "./../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const task = await Task.findAll();
    return res.status(201).json({ message: "Success", data: task });
  } catch (error) {
    console.log("Error en el servidor", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const createTask = async (req, res) => {
  const { name, done, projectId } = req.body;

  try {
    const createTask = await Task.create({ name, done, projectId });
    if (!createTask) {
      return res
        .status(400)
        .json({ message: "La tarea no se ha creado correctamente" });
    } else {
      return res
        .status(201)
        .json({ message: "Tarea Creada", data: createTask });
    }
  } catch (error) {
    console.log("Error getting project", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findOne({ where: { id } })
      .then((task) => {
        if (!task) {
          return res.status(404).json({ message: "No se encontró la tarea" });
        } else {
          return res.status(200).json({ message: "Success", data: task });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Error al realizar la consulta a la base de datos",
        });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    await Task.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Actualizado con  exito" });
  } catch (error) {
   
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.destroy({ where: { id } })
      .then(() => {
        return res.status(200).json({ message: "Deleted Task" });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ message: "Error al intentar eliminar la tarea" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
