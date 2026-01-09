const Task = require("../models/taskModel");

// Create task
exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  Task.create(
    { user_id: req.user.id, title },
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create task" });
      }
      res.status(201).json({ message: "Task created successfully" });
    }
  );
};

// Get all tasks for logged-in user
exports.getTasks = (req, res) => {
  Task.getByUser(req.user.id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch tasks" });
    }
    res.json(results);
  });
};

// Update task (mark complete/incomplete)
exports.updateTask = (req, res) => {
  const { completed } = req.body;
  const taskId = req.params.id;

  Task.update(taskId, completed, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update task" });
    }
    res.json({ message: "Task updated successfully" });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;

  Task.delete(taskId, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete task" });
    }
    res.json({ message: "Task deleted successfully" });
  });
};
