// client/src/components/ui/card.jsx
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h2>
  );
};



export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }) => {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
};
