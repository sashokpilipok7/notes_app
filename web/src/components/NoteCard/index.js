import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button } from "components/Button";
import styles from "./styles.module.css";

function NoteActions({ id, onDelete = () => {}, onEdit = () => {} }) {
  return (
    <div className={styles.noteCardActions}>
      <Button onClick={() => onEdit(id)} mode="info">
        Edit
      </Button>
      <Button onClick={() => onDelete(id)} mode="danger">
        Delete
      </Button>
    </div>
  );
}

export function NoteCard({ item, onDelete, onEdit }) {
  return (
    <div className={styles.noteCard} key={item.id}>
      <div className={styles.noteCardContent}>
        <h2>{item?.title}</h2>
        <p className={styles.noteCardText}> {item.content}</p>
        <Link to={`notes/${item?.id}`} className={styles.noteCardLink}>
          Read more
        </Link>
      </div>
      <NoteActions id={item?.id} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

NoteActions.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

NoteCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
