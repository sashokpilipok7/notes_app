import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function TextArea({ value, name, placeholder, required, rows = 6, onChange }) {
  return (
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={!!required}
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
  required: PropTypes.bool,
};

export default TextArea;
