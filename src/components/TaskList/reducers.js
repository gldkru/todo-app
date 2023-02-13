import { setItemStorage } from "./utils";

export function taskReducer(taskList, action) {
  const localStorageKey = "taskList";

  switch (action.type) {
    case "ADD_TASK": {
      const newTaskItem = {
        id: taskList.length + 1,
        name: action.task,
        completed: false,
      };

      const newTaskList = [...taskList, newTaskItem];

      setItemStorage(localStorageKey, newTaskList);

      return newTaskList;
    }

    case "REMOVE_TASK": {
      const newTaskList = taskList.filter((task) => task.id !== action.id);

      setItemStorage(localStorageKey, newTaskList);

      return newTaskList;
    }

    case "COMPLETE_TASK": {
      const newTaskList = taskList.map((task) => {
        if (task.id === action.id) {
          task.completed = action.value;
        }

        return task;
      });

      setItemStorage(localStorageKey, newTaskList);

      return newTaskList;
    }
  }
}

export function errorReducer(error, action) {
  switch (action.type) {
    case "SHOW_ERROR": {
      return action.text;
    }

    case "CLEAN_ERROR": {
      return "";
    }
  }
}
