import styles from "./styles.module.scss";

function Button({ children, onClick, className = "", ...props }) {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
