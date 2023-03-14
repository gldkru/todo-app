import { AddTask } from "./AddTask";
import { TaskList } from "./TaskList";
import { TaskContext } from "./TaskContext";

export const TaskApp = () => {
  return (
    <TaskContext>
      <AddTask />
      {/* TODO: Filter */}
      <TaskList />
    </TaskContext>
  );
};
