export const Task = ({ indx, children, completed, onChange, onRemove }) => {
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
