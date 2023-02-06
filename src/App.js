import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { Task } from "./components/Task";
import { Counter } from "./components/Counter";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");

  const countCompletedTasks = taskList.reduce(
    (acc, value) => (value.completed ? acc + 1 : acc),
    0
  );

  const addTask = (task) => {
    const newTaskItem = {
      id: taskList.length + 1,
      name: task,
      completed: false,
    };
    const newTaskList = [...taskList, newTaskItem];

    window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };

  const removeTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);

    window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };

  const handleSubmit = (task) => {
    // сброс ошибки
    setError("");

    // пустая задача
    if (!task) {
      setError("Пожалуйста, укажите название задачи");
      return;
    }

    addTask(task);
  };

  const handleCompleteTask = (value, id) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.completed = value;
      }

      return task;
    });

    window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };

  const handleRemoveTask = (task) => {
    removeTask(task);
  };

  useEffect(() => {
    const taskListStr = window.localStorage.getItem("taskList");

    if (taskListStr) {
      const taskList = JSON.parse(taskListStr);

      setTaskList(taskList);
    }
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
      {!!taskList && !!taskList.length && (
        <>
          <div>
            {taskList.map((task, index) => (
              <Task
                key={task.id}
                indx={index + 1}
                completed={task.completed}
                onChange={(value) => handleCompleteTask(value, task.id)}
                onRemove={() => handleRemoveTask(task.id)}
              >
                {task.name}
              </Task>
            ))}
          </div>
          <Counter
            countCompleted={countCompletedTasks}
            countTotal={taskList.length}
          />
        </>
      )}
    </div>
  );
}
