// button.jsx
export const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
