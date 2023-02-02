import { useState } from "react";
import { Form } from "./components/Form";
import { Task } from "./components/Task";
import { Counter } from "./components/Counter";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState(["first", "second"]);
  const [completedTaskList, setCompletedTaskList] = useState(["second"]);
  const [error, setError] = useState("");

  const handleCompleteTask = (task) => {
    if (completedTaskList.includes(task)) {
      setCompletedTaskList(completedTaskList.filter((t) => t !== task));
    } else {
      setCompletedTaskList([...completedTaskList, task]);
    }
  };

  const handleRemoveTask = (task) => {
    setTaskList(taskList.filter((t) => t !== task));
    setCompletedTaskList(completedTaskList.filter((t) => t !== task));
  };

  const handleSubmit = (task) => {
    // сброс ошибки
    setError("");

    // пустая задача
    if (!task) {
      return;
    }

    if (taskList.includes(task)) {
      setError("Такая задача уже есть");
      return;
    }

    setTaskList([...taskList, task]);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} />
      {error && (
        <div>
          {error} <button onClick={() => setError("")}>x</button>
        </div>
      )}
      <div>{JSON.stringify(taskList)}</div>
      <div>{JSON.stringify(completedTaskList)}</div>
      <div>
        {taskList.map((task, index) => (
          <Task
            key={index}
            indx={index + 1}
            completed={completedTaskList.includes(task)}
            onChange={handleCompleteTask}
            onRemove={handleRemoveTask}
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
