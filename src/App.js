import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { Task } from "./components/Task";
import { Counter } from "./components/Counter";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [error, setError] = useState("");

  const addTask = (task) => {
    const newTaskList = [...taskList, task];

    window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };
  const addCompletedTask = (task) =>
    setCompletedTaskList([...completedTaskList, task]);

  const removeTask = (task) => {
    const newTaskList = taskList.filter((t) => t !== task);

    window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };
  const removeCompletedTask = (task) =>
    setCompletedTaskList(completedTaskList.filter((t) => t !== task));

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

    addTask(task);
  };

  const handleCompleteTask = (task) => {
    if (completedTaskList.includes(task)) {
      removeCompletedTask(task);
    } else {
      addCompletedTask(task);
    }
  };

  const handleRemoveTask = (task) => {
    removeTask(task);
    removeCompletedTask(task);
  };

  useEffect(() => {
    const taskLiskStr = window.localStorage.getItem("taskList");
    const taskList = JSON.parse(taskLiskStr);

    setTaskList(taskList);
  }, []);

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
