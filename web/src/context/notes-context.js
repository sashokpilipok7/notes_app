import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { useHttpClient } from "hooks/http-hook";

export const NotesContext = createContext({
  notes: [],
  loading: false,
  error: null,
  setNotes: () => {},
  addNote: () => {},
  removeNote: () => {},
  updateNote: () => {},
});

export function NotesProvider({ children }) {
  const { error, isLoading: loading, sendReq } = useHttpClient();
  const [notes, setNotes] = useState([]);

  async function addNote(note) {
    if (!note || !note.title) return;

    const response = await sendReq("notes", "POST", JSON.stringify(note));
    if (response instanceof Error) {
      return;
    }
    setNotes((prevNotes) => [...prevNotes, note]);
  }

  async function removeNote(id) {
    if (!id) return;

    if (window.confirm("Are you sure you want to delete this note?")) {
      const response = await sendReq(`notes/${id}`, "DELETE");
      if (response instanceof Error) {
        return;
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  }

  async function updateNote(updatedNote) {
    if (!updatedNote || !updatedNote.title) return;

    const response = await sendReq(`notes/${updatedNote.id}`, "PUT", JSON.stringify(updatedNote));
    if (response instanceof Error) {
      return;
    }

    setNotes((prevNotes) => prevNotes.map((note) => (note.id === response?.id ? response : note)));
    return response;
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await sendReq("notes", "GET");
      if (response instanceof Error) {
        return;
      }
      setNotes(response);
    };

    fetchNotes();
  }, [sendReq]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        error,
        loading,
        setNotes,
        addNote,
        removeNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
