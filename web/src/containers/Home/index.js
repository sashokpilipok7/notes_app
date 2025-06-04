import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { NotesContext } from "containers/App";
import { Button, Layout } from "components";
import styles from "./styles.module.scss";

function HomePage() {
  const { notes, loading } = useContext(NotesContext);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  return (
    <Layout>
      {notes.map((item) => (
        <div to={`notes/${item?.id}`} className={styles.noteCard} key={item.id}>
          <div className={styles.noteCardContent}>
            <h2>{item?.title}</h2>
            <p className={styles.noteCardText}> {item.content}</p>
            <Link to={`notes/${item?.id}`} className={styles.noteCardLink}>
              Read more
            </Link>
          </div>
          <div className={styles.noteCardActions}>
            <Button onClick={() => navigate(`/edit/${item?.id}`)} mode="info">
              Edit
            </Button>
            <Button to={`notes/${item?.id}/delete`} mode="danger">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </Layout>
  );
}
export default HomePage;
