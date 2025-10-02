// client/src/components/ui/textarea.jsx
import React from "react";

export const Textarea = ({ id, value, onChange, placeholder, className = "", ...props }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border px-2 py-1 rounded resize-none ${className}`}
      {...props}
    />
  );
};
