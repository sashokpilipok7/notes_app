import { useContext } from "react";
import PropTypes from "prop-types";

import { NotesContext } from "containers/App";
import { Header } from "components";

import styles from "./styles.module.css";

export function Layout({ children }) {
  const { loading } = useContext(NotesContext);
  return (
    <>
      <main className={`${styles.main} container`}>
        <Header />
        {loading && <div className={styles.loading}>Loading...</div>}
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2023 Stellar Notes. All rights reserved.</p>
      </footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
