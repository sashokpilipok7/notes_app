import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { NotesContext } from "context/notes-context";
import { NoteCard } from "components";
import { Layout } from "layouts";

export function HomePage() {
  const navigate = useNavigate();
  const { error, notes, loading, removeNote } = useContext(NotesContext);

  function handleEdit(id) {
    if (!id) return;

    navigate(`/edit/${id}`);
  }

  return (
    <Layout>
      {notes.map((item) => (
        <NoteCard key={item?.id} item={item} onDelete={removeNote} onEdit={handleEdit} />
      ))}
      {notes.length === 0 && !loading && (
        <div className="notFound">
          {error && <p className="error">{error}</p>}
          <p>No notes available</p>

          <Link className="link" to="/create">
            Create Note
          </Link>
        </div>
      )}
    </Layout>
  );
}
