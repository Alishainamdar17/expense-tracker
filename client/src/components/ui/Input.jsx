// src/components/ui/Input.jsx
import React from "react";

export const Input = ({ id, type = "text", value, onChange, ...props }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
      style={{
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
      }}
    />
  );
};
