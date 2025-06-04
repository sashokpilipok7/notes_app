const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("express").json;

const app = express();
const port = 5000;

// Налаштування для JSON
app.use(bodyParser());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

const db = new sqlite3.Database("notes.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);
});

app.get("/notes", (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required" });
  const now = new Date().toISOString();
  db.run(
    `INSERT INTO notes (title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?)`,
    [title, content, now, now],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        title,
        content,
        createdAt: now,
        updatedAt: now,
      });
    }
  );
});

app.put("/notes/:id", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required" });
  const { id } = req.params;
  const now = new Date().toISOString();
  db.run(
    `UPDATE notes SET title=?, content=?, updatedAt=? WHERE id=?`,
    [title, content, now, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Note not found" });
      res.json({ id, title, content, updatedAt: now });
    }
  );
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM notes WHERE id=?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Note not found" });
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`API запущено: http://localhost:${port}`);
});
