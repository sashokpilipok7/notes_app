import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "utils/api";
import { NotesContext } from "containers/App";
import { NoteCard, Layout } from "components";

const DELETE_CONFIRMATION_MESSAGE =
  "Are you sure you want to delete this note?";

function HomePage() {
  const { notes, loading, removeNote } = useContext(NotesContext);
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (!id) return;

    if (window.confirm(DELETE_CONFIRMATION_MESSAGE)) {
      await api.delete(`/notes/${id}`);
      removeNote(id);
    }
  }

  function handleEdit(id) {
    if (!id) return;

    navigate(`/edit/${id}`);
  }

  return (
    <Layout>
      {notes.map((item) => (
        <NoteCard item={item} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
      {notes.length === 0 && !loading && (
        <div className="notFound">
          <p>No notes available</p>

          <Link className="link" to="/create">
            Create Note
          </Link>
        </div>
      )}
    </Layout>
  );
}
export default HomePage;
