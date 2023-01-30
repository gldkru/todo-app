import { useState } from "react";

export const Form = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
