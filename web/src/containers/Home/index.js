import { useContext } from "react";
import { Link } from "react-router-dom";

import { NotesContext } from "containers/App";
import { Input, TextArea, Button } from "components";
import styles from "./styles.module.scss";

function HomePage() {
  const { notes, loading } = useContext(NotesContext);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="container">
      <h1 className={styles.title}>Stellars notes</h1>
      {notes.map((item) => (
        <div to={`notes/${item?.id}`} className={styles.noteCard} key={item.id}>
          <div className={styles.noteCardContent}>
            <h2>{item.title}</h2>
            <p className={styles.noteCardText}> {item.content}</p>
            <Link to={`notes/${item.id}`} className={styles.noteCardLink}>
              Read more
            </Link>
          </div>
          <div className={styles.noteCardActions}>
            <Button to={`notes/${item.id}/edit`} variant="primary">
              Edit
            </Button>
            <Button to={`notes/${item.id}/delete`} variant="danger">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default HomePage;
