const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.get("/profile", authMiddleware, (req, res) => {
  User.findByEmail(req.user.email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    const user = results[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  });
});

module.exports = router;
