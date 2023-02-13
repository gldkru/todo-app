import { getItemStorage } from "./utils";

// export function intialTaskList({ storgeKey, initialValue }) {
//   const value = getItemStorage(storgeKey);

//   if (value) {
//     return value;
//   } else {
//     return initialValue;
//   }
// }

export const intialTaskList = ({ storgeKey, initialValue }) =>
  getItemStorage(storgeKey) || initialValue;
