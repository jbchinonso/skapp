import React from "react";
import "./Formfield.css";
export default function Formfield({ type, bg, placeholder, text, width, action, disabled }) {
  return (
    <>
      <input
        type={type}
        className={bg}
        placeholder={placeholder}
        value={text}
        style={{ width: `${width}px` }}
        onChange={action}
        onClick={action}
        disabled={disabled}
      />
    </>
  );
}
