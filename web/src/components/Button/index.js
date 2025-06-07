import PropTypes from "prop-types";
import styles from "./styles.module.css";

export function Button({ children, onClick, mode, className = "", ...props }) {
  return (
    <button
      className={`${styles.button} ${styles[mode]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  mode: PropTypes.string,
  className: PropTypes.string,
};
