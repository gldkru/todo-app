import { useContext } from "react";
import { storageKey } from "./consts";
import { TasksDispatchContext } from "../context/TasksContext";

export const Task = ({ indx, id, children, completed }) => {
  const dispatchTaskList = useContext(TasksDispatchContext);

  const handleCompleteTask = (value, id) => {
    dispatchTaskList({
      type: "COMPLETE_TASK",
      value,
      id,
      storageKey,
    });
  };

  const handleRemoveTask = (id) => {
    dispatchTaskList({ type: "REMOVE_TASK", id, storageKey });
  };

  return (
    <label className={`task ${completed ? "line-through" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => handleCompleteTask(e.target.checked, id)}
      />
      {indx}. {children}
      <button onClick={() => handleRemoveTask(id)}>x</button>
    </label>
  );
};
