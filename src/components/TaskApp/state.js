import { getItemStorage } from "./utils";

// export function intialTaskList({ storgeKey, initialValue }) {
//   const value = getItemStorage(storgeKey);

//   if (value) {
//     return value;
//   } else {
//     return initialValue;
//   }
// }

export const intialTaskList = ({ storageKey, initialValue }) =>
  getItemStorage(storageKey) || initialValue;

export const storageKey = "taskList";
