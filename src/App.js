import { useState } from "react";
import "./styles.css";

export default function App() {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(["first", "second"]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTaskList([...taskList, taskName]);
    setTaskName("");
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>{JSON.stringify(taskList)}</div>
    </div>
  );
}
