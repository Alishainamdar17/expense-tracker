// client/src/components/ui/select.jsx
import React from "react";

// Main Select component (renders a native <select>)
export const Select = ({ value, onValueChange, children, className = "", ...props }) => {
  const items = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type.displayName === "SelectItem"
  );

  return (
    <select
      value={value || ""}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      className={`w-full border px-2 py-1 rounded ${className}`}
      {...props}
    >
      {items.map((item, idx) => (
        <option key={idx} value={item.props.value}>
          {item.props.children}
        </option>
      ))}
    </select>
  );
};

// Option inside Select
export const SelectItem = ({ value, children }) => null;
SelectItem.displayName = "SelectItem";

// Dummy wrappers (keep JSX compatible with shadcn usage)
export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => (
  <option value="" disabled hidden>
    {placeholder}
  </option>
);
