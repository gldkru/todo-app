import { setItemStorage } from "./utils";

export function taskReducer(taskList, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTaskItem = {
        id: taskList.length + 1,
        name: action.task,
        completed: false,
      };

      const newTaskList = [...taskList, newTaskItem];

      if (action.storageKey) {
        setItemStorage(action.storageKey, newTaskList);
      }

      return newTaskList;
    }

    case "REMOVE_TASK": {
      const newTaskList = taskList.filter((task) => task.id !== action.id);

      if (action.storageKey) {
        setItemStorage(action.storageKey, newTaskList);
      }

      return newTaskList;
    }

    case "COMPLETE_TASK": {
      const newTaskList = taskList.map((task) => {
        if (task.id === action.id) {
          task.completed = action.value;
        }

        return task;
      });

      if (action.storageKey) {
        setItemStorage(action.storageKey, newTaskList);
      }

      return newTaskList;
    }

    // case "FILTER_TASKS": {
    //   if (action.completed === null) {
    //     return newTaskList;
    //   }

    //   console.log(taskList);

    //   const newTaskList = taskList.filter(
    //     (task) => task.completed !== action.completed
    //   );

    //   return newTaskList;
    // }
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
