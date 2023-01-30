export const Task = ({ indx, children, completed, onChange }) => {
  return (
    <label className={`task ${completed ? "line-through" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onChange(children)}
      />
      {indx}. {children}
    </label>
  );
};
