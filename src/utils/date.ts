export const dateToStringKr = (date: string) => {
  const _date = new Date(date);

  return (
    _date.getFullYear() +
    '년 ' +
    _date.getMonth() +
    '월 ' +
    _date.getDate() +
    '일'
  );
};
