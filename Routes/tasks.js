const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Crear una tarea
router.post("/create", async (req, res) => {
  try {
    const { title } = req.body;
    const nuevaTarea = new Task({ title });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Task.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
});

// Obtener una tarea por ID
router.get("/id/:_id", async (req, res) => {
  try {
    const tarea = await Task.findById(req.params._id);
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la tarea", error });
  }
});

// Marcar tarea como completada
router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
    const tarea = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
});

// Actualizar solo el título de la tarea
router.put("/id/:_id", async (req, res) => {
  try {
    const { title } = req.body;
    const tarea = await Task.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true }
    );
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
});

// Eliminar una tarea
router.delete("/id/:_id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params._id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
});

module.exports = router;
