const { validationResult } = require("express-validator");
const Note = require("../models/note");

async function getNotes(req, res) {
  try {
    const users = await Note.findAll();
    setTimeout(() => res.json(users), 1000);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function createNote(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((item) => `${item.msg} at ${item.path}`);
    return res.status(422).json({ error: errorMessages.join(", ") });
  }

  const { title, content } = req.body;
  const now = new Date().toISOString();

  try {
    const note = await Note.create({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });
    setTimeout(() => {
      res.status(201).json(note);
    }, 1000);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function updateNote(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((item) => `${item.msg} at ${item.path}`);
    return res.status(422).json({ error: errorMessages.join(", ") });
  }

  const { title, content } = req.body;
  const { id } = req.params;
  const now = new Date().toISOString();

  try {
    const note = await Note.findByPk(Number(id));
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.title = title;
    note.content = content;
    note.updatedAt = now;
    await note.save();

    setTimeout(() => res.json(note), 1000);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function deleteNote(req, res) {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(Number(id));
    if (!note) return res.status(404).json({ error: "Note not found" });

    await note.destroy();
    setTimeout(() => res.json({ message: "Note deleted successfully" }), 1000);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.getNotes = getNotes;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
