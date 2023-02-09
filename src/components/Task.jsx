import { useEffect } from "react";

export const Task = ({ indx, children, completed, onChange, onRemove }) => {
  useEffect(() => {
    console.log(indx, "componentDidMount");

    return () => {
      console.log(indx, "componentDidUnmount");
    };
  }, [completed]);

  return (
    <label className={`task ${completed ? "line-through" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onChange(e.target.checked)}
      />
      {indx}. {children}
      <button onClick={onRemove}>x</button>
    </label>
  );
};
