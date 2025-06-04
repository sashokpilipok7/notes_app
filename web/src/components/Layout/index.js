import { Header } from "components";

import styles from "./styles.module.scss";

export function Layout({ children }) {
  return (
    <>
      <main className={`${styles.main} container`}>
        <Header />
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2023 Stellar Notes. All rights reserved.</p>
      </footer>
    </>
  );
}
