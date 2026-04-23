const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
  res.json({ message: "User created" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query("SELECT * FROM users WHERE username=?", [username]);
  if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, rows[0].password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Auth middleware
const auth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.sendStatus(403);
  try {
    req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

// CRUD for tasks
app.post("/tasks", auth, async (req, res) => {
  const { title } = req.body;
  await db.query("INSERT INTO tasks (title, user_id) VALUES (?, ?)", [title, req.user.id]);
  res.json({ message: "Task added" });
});

app.get("/tasks", auth, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tasks WHERE user_id=?", [req.user.id]);
  res.json(rows);
});

app.put("/tasks/:id", auth, async (req, res) => {
  const { title } = req.body;
  await db.query("UPDATE tasks SET title=? WHERE id=? AND user_id=?", [title, req.params.id, req.user.id]);
  res.json({ message: "Task updated" });
});

app.delete("/tasks/:id", auth, async (req, res) => {
  await db.query("DELETE FROM tasks WHERE id=? AND user_id=?", [req.params.id, req.user.id]);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
