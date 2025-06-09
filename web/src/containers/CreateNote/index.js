import { useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { NotesContext } from "context/notes-context";
import { Input, TextArea, Button } from "components";
import { Layout } from "layouts";
import styles from "./styles.module.css";

const NOTE_EMPTY = {
  title: "",
  content: "",
};

export function CreateNotePage({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, addNote, updateNote } = useContext(NotesContext);

  const activeNote = useMemo(() => {
    if (isEdit && id) {
      const note = notes.find((note) => note.id === +id);
      return { title: note?.title, content: note?.content };
    }
    return NOTE_EMPTY;
  }, [isEdit, id]);

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

    if (isEdit && id) {
      await updateNote({ id, ...note });
      navigate(`/notes/${id}`);
    }
    if (!isEdit) {
      await addNote(note);
      setNote(NOTE_EMPTY);
    }
  }

  return (
    <Layout>
      <h2 className={styles.title}>{isEdit ? "Edit my note" : "Create a new note"}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          name="title"
          placeholder="Note Title"
          className={styles.input}
          value={note?.title}
          required
          onChange={handleChange}
        />
        <TextArea
          name="content"
          placeholder="Note Content"
          className={styles.textarea}
          value={note?.content}
          required
          onChange={handleChange}
        />
        <Button type="submit" className={styles.button}>
          {isEdit ? "Update Note" : "Create Note"}
        </Button>
      </form>
    </Layout>
  );
}
CreateNotePage.propTypes = {
  isEdit: PropTypes.bool,
};
