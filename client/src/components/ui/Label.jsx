// src/components/ui/Label.jsx
import React from "react";

export const Label = ({ htmlFor, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      style={{
        display: "block",
        marginBottom: "0.25rem",
        fontWeight: "bold",
      }}
    >
      {children}
    </label>
  );
};
