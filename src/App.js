import { useState } from "react";
import { Form } from "./components/Form";
import { Task } from "./components/Task";
import { Counter } from "./components/Counter";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState(["first", "second"]);
  const [completedTaskList, setCompletedTaskList] = useState(["second"]);

  const handleCompleteTask = (task) => {
    if (completedTaskList.includes(task)) {
      setCompletedTaskList([...completedTaskList.filter((t) => t !== task)]);
    } else {
      setCompletedTaskList([...completedTaskList, task]);
    }
  };

  return (
    <div className="App">
      <Form onSubmit={(task) => setTaskList([...taskList, task])} />
      <div>{JSON.stringify(taskList)}</div>
      <div>{JSON.stringify(completedTaskList)}</div>
      <div>
        {taskList.map((task, index) => (
          <Task
            indx={index + 1}
            completed={completedTaskList.includes(task)}
            onChange={handleCompleteTask}
          >
            {task}
          </Task>
        ))}
      </div>
      <Counter
        countCompleted={completedTaskList.length}
        countTotal={taskList.length}
      />
    </div>
  );
}
