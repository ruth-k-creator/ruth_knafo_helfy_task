const { tasks, getNextId } = require("../data/tasks");

const PRIORITIES = ["low", "medium", "high"];

function validateCreateBody(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push("Body must be an object");
    return errors;
  }

  if (typeof body.title !== "string" || body.title.trim().length === 0) {
    errors.push("title is required and must be a non-empty string");
  }

  if (typeof body.description !== "string") {
    errors.push("description must be a string");
  }

  if (!PRIORITIES.includes(body.priority)) {
    errors.push('priority must be one of: "low", "medium", "high"');
  }

  return errors;
}

function validateUpdateBody(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push("Body must be an object");
    return errors;
  }

  if ("title" in body && (typeof body.title !== "string" || body.title.trim().length === 0)) {
    errors.push("title must be a non-empty string");
  }

  if ("description" in body && typeof body.description !== "string") {
    errors.push("description must be a string");
  }

  if ("priority" in body && !PRIORITIES.includes(body.priority)) {
    errors.push('priority must be one of: "low", "medium", "high"');
  }

  if ("completed" in body && typeof body.completed !== "boolean") {
    errors.push("completed must be a boolean");
  }

  return errors;
}

// GET /api/tasks
exports.getAllTasks = (req, res, next) => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    next({ error: error.message, status: 400 });
  }
};

// POST /api/tasks
exports.createTask = (req, res, next) => {
  try {
    const errors = validateCreateBody(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const newTask = {
      id: getNextId(),
      title: req.body.title.trim(),
      description: req.body.description,
      completed: false,
      createdAt: new Date(),
      priority: req.body.priority,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    next({ error: error.message, status: 400 });
  }
};

// PUT /api/tasks/:id
exports.updateTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const errors = validateUpdateBody(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    const { title, description, priority, completed } = req.body;    
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.completed = completed;

    res.status(200).json(task);
  } catch (error) {
    next({ error: error.message, status: 400 });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    const deleted = tasks.splice(index, 1)[0];
    res.status(200).json(deleted);
  } catch (error) {
    next({ error: error.message, status: 400 });
  }
};

// PATCH /api/tasks/:id/toggle
exports.toggleTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = !task.completed;
    res.status(200).json(task);
  } catch (error) {
    next({ error: error.message, status: 400 });
  }
};