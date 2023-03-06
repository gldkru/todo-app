import { useReducer, useMemo, useState } from "react";
import { Form } from "../Form";
import { Task } from "../Task";
import { Counter } from "../Counter";
import { intialTaskList } from "./state";
import { taskReducer, errorReducer } from "./reducers";

export default function TaskList() {
  const storageKey = "taskList";
  const [taskList, dispatchTaskList] = useReducer(
    taskReducer,
    { storageKey, initialValue: [] },
    intialTaskList
  );
  const [error, dispatchError] = useReducer(errorReducer, "");
  const [filterActive, setFilterActive] = useState("");

  // dispatch(action) => reducer(state, action) => newState

  // const countCompletedTasks = (() => {
  //   console.log("render");
  //   return taskList.reduce(
  //     (acc, value) => (value.completed ? acc + 1 : acc),
  //     0
  //   );
  // })();

  const countCompletedTasks = useMemo(() => {
    return filterActive === ""
      ? taskList.reduce((acc, value) => (value.completed ? acc + 1 : acc), 0)
      : -1;
  }, [taskList, filterActive]);

  const filteredTaskList = useMemo(() => {
    if (filterActive === "") {
      return taskList;
    }
    const value = filterActive === "true";

    return taskList.filter((task) => task.completed !== value);
  }, [taskList, filterActive]);

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

    dispatchTaskList({ type: "ADD_TASK", task, storageKey });
  };

  const handleCompleteTask = (value, id) => {
    dispatchTaskList({
      type: "COMPLETE_TASK",
      value,
      id,
      storageKey,
    });
  };

  const handleRemoveTask = (id) => {
    dispatchTaskList({ type: "REMOVE_TASK", id, storageKey });
  };

  const handleChangeFilter = (event) => {
    // const value = event.target.value;

    // if (value === "true") {
    //   dispatchTaskList({ type: "FILTER_TASKS", completed: true });
    // } else if (value === "false") {
    //   dispatchTaskList({ type: "FILTER_TASKS", completed: false });
    // } else {
    //   dispatchTaskList({ type: "FILTER_TASKS", completed: null });
    // }

    setFilterActive(event.target.value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      {error && (
        <div>
          {error} <button onClick={handleCleanError}>x</button>
        </div>
      )}
      {/* <br />
      <div>{JSON.stringify(taskList)}</div> */}
      <br />
      <select value={filterActive} onChange={handleChangeFilter}>
        <option value="">Все</option>
        <option value="true">Незавершенные</option>
        <option value="false">Завершенные</option>
      </select>
      <br />
      <br />
      {!!taskList && !!taskList.length ? (
        <>
          <div>
            {filteredTaskList.map((task, index) => (
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
            countTotal={filteredTaskList.length}
          />
        </>
      ) : (
        <div>Задач нет</div>
      )}
    </>
  );
}
