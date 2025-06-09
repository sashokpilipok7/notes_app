const express = require("express");
const { check } = require("express-validator");
const noteControllers = require("../controllers/notes");

const router = express.Router();

router.get("/", noteControllers.getNotes);

router.post(
  "/",
  [check("title").trim().notEmpty(), check("content").isLength({ min: 5 })],
  noteControllers.createNote
);

router.put(
  "/:id",
  [check("title").trim().notEmpty(), check("content").isLength({ min: 5 })],
  noteControllers.updateNote
);

router.delete("/:id", noteControllers.deleteNote);

module.exports = router;
