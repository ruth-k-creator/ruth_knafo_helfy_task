const PRIORITIES = ["low", "medium", "high"];

const taskModel = {
  id: "number",
  title: "string",
  description: "string",
  completed: "boolean",
  createdAt: "date",
  priority: PRIORITIES,
};

module.exports = { taskModel, PRIORITIES };