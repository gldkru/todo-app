export const Counter = ({ countCompleted = -1, countTotal }) => {
  return countCompleted === -1 ? (
    <div>Всего задач {countTotal}</div>
  ) : (
    <div>
      Выполнено {countCompleted} из {countTotal}
    </div>
  );
};
