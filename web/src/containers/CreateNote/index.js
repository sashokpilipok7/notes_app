import { useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import api from "utils/api";
import { NotesContext } from "containers/App";
import { Input, TextArea, Button, Layout } from "components";
import styles from "./styles.module.scss";

const NOTE_CREATE = "create";
const NOTE_EDIT = "edit";

const NOTE_EMPTY = {
  title: "",
  content: "",
};

function CreateNotePage({ mode }) {
  const { id } = useParams();
  const { notes, addNote, updateNote } = useContext(NotesContext);

  const activeNote = useMemo(() => {
    if (mode === NOTE_EDIT && id) {
      const note = notes.find((note) => note.id === +id);
      console.log("activeNote", note);
      return { title: note?.title, content: note?.content };
    }
    return NOTE_EMPTY;
  }, [mode, id]);

  const [note, setNote] = useState(activeNote);

  function handleChange(event) {
    if (event.target) {
      const { name, value } = event.target;
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (mode === NOTE_EDIT) {
      const result = await api.put(`/notes/${id}`, { ...note });
      updateNote(result);
    }
    if (mode === NOTE_CREATE) {
      const result = await api.post("/notes", { ...note });
      addNote(result);
      setNote(NOTE_EMPTY);
    }
  }

  return (
    <Layout>
      {mode === NOTE_CREATE && (
        <h2 className={styles.title}>Create a new note</h2>
      )}
      {mode === NOTE_EDIT && <h2 className={styles.title}>Edit my note</h2>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          name="title"
          placeholder="Note Title"
          className={styles.input}
          value={note?.title}
          onChange={handleChange}
        />
        <TextArea
          name="content"
          placeholder="Note Content"
          className={styles.textarea}
          value={note?.content}
          onChange={handleChange}
        />
        <Button type="submit" className={styles.button}>
          {mode === NOTE_CREATE ? "Create Note" : "Update Note"}
        </Button>
      </form>
    </Layout>
  );
}
CreateNotePage.propTypes = {
  mode: PropTypes.string,
};
export default CreateNotePage;
