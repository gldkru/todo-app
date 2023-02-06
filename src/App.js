import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { Task } from "./components/Task";
// import { Counter } from "./components/Counter";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");

  const addTask = (task) => {
    const newTaskItem = {
      id: taskList.length + 1,
      name: task,
      completed: false,
    };
    const newTaskList = [...taskList, newTaskItem];

    // window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

    setTaskList(newTaskList);
  };

  const removeTask = (task) => {
    const newTaskList = taskList.filter((t) => t !== task);

    // window.localStorage.setItem("taskList", JSON.stringify(newTaskList));

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

  const handleCompleteTask = (task) => {};

  const handleRemoveTask = (task) => {
    removeTask(task);
  };

  // useEffect(() => {
  //   const taskListStr = window.localStorage.getItem("taskList");

  //   if (taskListStr) {
  //     const taskList = JSON.parse(taskListStr);

  //     setTaskList(taskList);
  //   }
  // }, []);

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
                onChange={handleCompleteTask}
                onRemove={handleRemoveTask}
              >
                {task.name}
              </Task>
            ))}
          </div>
          {/* <Counter
            countCompleted={completedTaskList.length}
            countTotal={taskList.length}
          /> */}
        </>
      )}
    </div>
  );
}
