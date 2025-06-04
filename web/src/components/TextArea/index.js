import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function TextArea({ value, name, placeholder, rows = 6, onChange }) {
  return (
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={styles.textarea}
    />
  );
}

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default TextArea;
