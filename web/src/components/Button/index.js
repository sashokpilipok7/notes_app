import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function Button({ children, onClick, className = "", ...props }) {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
