import { useState } from "react";
import { Form } from "./components/Form";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState(["first", "second"]);

  return (
    <div className="App">
      <Form onSubmit={(task) => setTaskList([...taskList, task])} />
      <div>{JSON.stringify(taskList)}</div>
    </div>
  );
}
