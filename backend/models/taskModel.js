const db = require("../config/db");

const Task = {
  create: (task, callback) => {
    const sql = "INSERT INTO tasks (user_id, title) VALUES (?, ?)";
    db.query(sql, [task.user_id, task.title], callback);
  },

  getByUser: (userId, callback) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(sql, [userId], callback);
  },

  update: (id, completed, callback) => {
    const sql = "UPDATE tasks SET completed = ? WHERE id = ?";
    db.query(sql, [completed, id], callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = Task;
