import { useReducer } from "react";
import { Form } from "../Form";
import { Task } from "../Task";
import { Counter } from "../Counter";
import { taskReducer, errorReducer } from "./reducers";
// import { useLocalStorage } from "./hooks/useLocalStorage";

export default function TaskList() {
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
    <>
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
    </>
  );
}
