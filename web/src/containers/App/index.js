import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router";

import api from "utils/api";
import HomePage from "containers/Home";

export const NotesContext = createContext({
  notes: [],
  loading: false,
  setNotes: () => {},
  addNote: () => {},
  removeNote: () => {},
  updateNote: () => {},
  setLoading: () => {},
});

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };
  const removeNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/notes");

        setNotes(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed: ", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        setNotes,
        addNote,
        removeNote,
        updateNote,
        setLoading,
      }}
    >
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* <Route path="/search" element={<SearchPage />} />
      <Route path="/changed" element={<ChangedCurrencyPage />} />
      <Route path="/currency/:id" element={<CurrencyPage />} /> */}
      </Routes>
    </NotesContext.Provider>
  );
}

export default App;
