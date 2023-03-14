import { useReducer } from "react";
import { TasksContext, TasksDispatchContext } from "../context/TasksContext";
import { storageKey } from "./consts";
import { taskReducer } from "./TaskApp/reducers";
import { intialTaskList } from "./TaskApp/state";

export const TaskContext = ({ children }) => {
  const [taskList, dispatchTaskList] = useReducer(
    taskReducer,
    { storageKey, initialValue: [] },
    intialTaskList
  );

  return (
    <TasksContext.Provider value={taskList}>
      <TasksDispatchContext.Provider value={dispatchTaskList}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};
