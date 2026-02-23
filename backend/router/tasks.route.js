const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} = require("../Controller/tasks.controller");

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

module.exports = router;