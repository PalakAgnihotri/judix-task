const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    User.create(
      { name, email, password: hashedPassword },
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "User creation failed" });
        }

        return res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user
  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });
};
