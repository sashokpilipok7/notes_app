import { useContext } from "react";
import PropTypes from "prop-types";

import { NotesContext } from "containers/App";
import { Input, TextArea, Button, Layout } from "components";
import styles from "./styles.module.scss";

function CreateNotePage({ mode }) {
  const { loading } = useContext(NotesContext);

  if (loading) return <div>Loading...</div>;
  return (
    <Layout>
      {mode === "create" && <h2 className={styles.title}>Create a new note</h2>}
      {mode === "edit" && <h2 className={styles.title}>Edit my note</h2>}
      <form className={styles.form}>
        <Input
          type="text"
          name="title"
          placeholder="Note Title"
          className={styles.input}
        />
        <TextArea
          name="content"
          placeholder="Note Content"
          className={styles.textarea}
        />
        <Button type="submit" className={styles.button}>
          Create Note
        </Button>
      </form>
    </Layout>
  );
}
CreateNotePage.propTypes = {
  mode: PropTypes.string,
};
export default CreateNotePage;
