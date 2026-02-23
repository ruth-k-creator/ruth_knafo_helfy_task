
const express = require("express");
const cors = require("cors");

const tasksRouter = require("./router/tasks.route");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// הגדרות
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http://localhost:4000/
app.get("/", (req, res) => {
  res.send("welcome to my website");
});


app.use("/api/tasks", tasksRouter);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.use(errorMiddleware);


const port = 4000;
app.listen(port, () => {
  console.log("server running at http://localhost:" + port);
});