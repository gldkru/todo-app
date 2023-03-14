import { useMemo, useContext } from "react";
import { Task } from "./Task";
import { Counter } from "./Counter";
import { storageKey } from "./consts";
import { TasksContext } from "../context/TasksContext";

export const TaskList = () => {
  const taskList = useContext(TasksContext);

  // const countCompletedTasks = useMemo(() => {
  //   return filterActive === ""
  //     ? taskList.reduce((acc, value) => (value.completed ? acc + 1 : acc), 0)
  //     : -1;
  // }, [taskList]);
  
  return (
    <>
      {!!taskList && !!taskList.length ? (
        <>
          <div>
            {taskList.map((task, index) => (
              <Task
                key={task.id}
                indx={index + 1}
                id={task.id}
                completed={task.completed}
              >
                {task.name}
              </Task>
            ))}
          </div>
          {/* <Counter
            countCompleted={countCompletedTasks}
            countTotal={taskList.length}
          /> */}
        </>
      ) : (
        <div>Задач нет</div>
      )}
    </>
  );
}
