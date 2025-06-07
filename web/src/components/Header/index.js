import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Stellar Notes</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className={styles.navLink}>
              Add Note
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
