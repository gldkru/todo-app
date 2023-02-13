export function taskReducer(taskList, action) {
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

export function errorReducer(error, action) {
  if (action.type === "SHOW_ERROR") {
    return action.text;
  } else if (action.type === "CLEAN_ERROR") {
    return "";
  }
}
