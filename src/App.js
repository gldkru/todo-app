import { useReducer, useState } from "react";
import { Form } from "./components/Form";
import { Task } from "./components/Task";
import { Counter } from "./components/Counter";
// import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styles.css";

function taskReducer(taskList, action) {
  if (action.type === "ADD_TASK") {
    const newTaskItem = {
      id: taskList.length + 1,
      name: action.task,
      completed: false,
    };

    return [...taskList, newTaskItem];
  } else if (action.type === "REMOVE_TASK") {
    return taskList.filter((task) => task.id !== action.id);
  } else if (action.type === "COMPLETE_TASK") {
    const newTaskList = taskList.map((task) => {
      if (task.id === action.id) {
        task.completed = action.value;
      }

      return task;
    });

    return newTaskList;
  }
}

function errorReducer(error, action) {
  if (action.type === "SHOW_ERROR") {
    return action.text;
  } else if (action.type === "CLEAN_ERROR") {
    return "";
  }
}

export default function App() {
  // const [taskList, setTaskList] = useLocalStorage("taskList", []);
  const [taskList, dispatchTaskList] = useReducer(taskReducer, []);
  const [error, dispatchError] = useReducer(errorReducer, "");

  const countCompletedTasks = taskList.reduce(
    (acc, value) => (value.completed ? acc + 1 : acc),
    0
  );

  const handleCleanError = () => {
    dispatchError({ type: "CLEAN_ERROR" });
  };

  const handleSubmit = (task) => {
    // сброс ошибки
    dispatchError({ type: "CLEAN_ERROR" });

    // пустая задача
    if (!task) {
      dispatchError({
        type: "SHOW_ERROR",
        text: "Пожалуйста, укажите название задачи",
      });
      return;
    }

    dispatchTaskList({ type: "ADD_TASK", task });
  };

  const handleCompleteTask = (value, id) => {
    dispatchTaskList({ type: "COMPLETE_TASK", value, id });
  };

  const handleRemoveTask = (id) => {
    dispatchTaskList({ type: "REMOVE_TASK", id });
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} />
      {error && (
        <div>
          {error} <button onClick={handleCleanError}>x</button>
        </div>
      )}
      <div>{JSON.stringify(taskList)}</div>
      {!!taskList && !!taskList.length ? (
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
      ) : (
        <div>Задач нет</div>
      )}
    </div>
  );
}
