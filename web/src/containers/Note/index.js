import { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { NotesContext } from "context/notes-context";
import { Layout } from "layouts";
import styles from "./styles.module.css";

export function NotePage() {
  const { id } = useParams();
  const { notes, loading } = useContext(NotesContext);

  const note = useMemo(() => {
    return notes.find((note) => note.id === +id);
  }, [id, notes]);

  return (
    <Layout>
      <div className={styles.note}>
        {note && (
          <div className={styles.main}>
            <h1 className={styles.title}>{note.title}</h1>
            <p className={styles.content}>{note.content}</p>
            <br />
            <Link className="link" to={`/edit/${note.id}`}>
              Edit Note
            </Link>
          </div>
        )}
        {!loading && !note && (
          <div className="notFound">
            <p>Note not found</p>
            <Link className="link" to="/">
              Go back to notes
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default NotePage;
