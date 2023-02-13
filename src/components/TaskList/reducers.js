export function taskReducer(taskList, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTaskItem = {
        id: taskList.length + 1,
        name: action.task,
        completed: false,
      };

      return [...taskList, newTaskItem];
    }

    case "REMOVE_TASK": {
      return taskList.filter((task) => task.id !== action.id);
    }

    case "COMPLETE_TASK": {
      const newTaskList = taskList.map((task) => {
        if (task.id === action.id) {
          task.completed = action.value;
        }

        return task;
      });

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
