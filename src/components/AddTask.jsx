import { useContext, useReducer } from "react";
import { errorReducer } from "./TaskApp/reducers";
import { Form } from "./Form";
import { storageKey } from "./TaskApp/state";
import { TasksDispatchContext } from "../context/TasksContext";

export const AddTask = () => {
  const [error, dispatchError] = useReducer(errorReducer, "");
  const dispatchTaskList = useContext(TasksDispatchContext);

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

    dispatchTaskList({ type: "ADD_TASK", task, storageKey });
  };

  const handleCleanError = () => {
    dispatchError({ type: "CLEAN_ERROR" });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      {error && (
        <div>
          {error} <button onClick={handleCleanError}>x</button>
        </div>
      )}
    </>
  );
};
