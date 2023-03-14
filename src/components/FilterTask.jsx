import { useState } from "react";

export const FilterTask = () => {
  const [filterActive, setFilterActive] = useState("");

  const handleChangeFilter = (event) => {
    setFilterActive(event.target.value);
  };

  return (
    <select value={filterActive} onChange={handleChangeFilter}>
      <option value="">Все</option>
      <option value="true">Незавершенные</option>
      <option value="false">Завершенные</option>
    </select>
  );
};
