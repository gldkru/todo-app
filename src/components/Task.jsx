export const Task = ({ indx, children, completed, onChange, onRemove }) => {
  return (
    <label className={`task ${completed ? "line-through" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onChange(children)}
      />
      {indx}. {children}
      <button onClick={() => onRemove(children)}>x</button>
    </label>
  );
};
