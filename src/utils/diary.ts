import { DiaryType } from 'types/dataType';

// 두 배열을 비교하여 최신순의 데이터가 있으면 반환하고, 없으면 falsy 값을 반환한다.
export const compareDate = (prev: DiaryType[], cur: DiaryType[]) => {
  if (!prev.length || !cur.length) return;

  // 개수가 더 적은 배열 / 더 많은 배열
  const fewerData = prev.length < cur.length ? prev : cur,
    moreData = prev.length < cur.length ? cur : prev;

  // 두 배열 길이의 차이
  const diff = moreData.length - fewerData.length;

  // 개수가 더 많은 배열을 filter로 순회하며 최신의 데이터만 반환한다.
  return moreData.filter(valueOfMoreData => {
    // 두 배열 길이의 차이 개수만큼 반복
    for (let index = 0; index <= diff; index++) {
      const dateOfMoreData = new Date(valueOfMoreData.created_at),
        dateOfFewerData = new Date(fewerData[index].created_at);

      return (
        // 각 데이터의 created_at 값 비교 -> 더 최신의 데이터가 있는 경우 해당 객체들을 배열로 묶어서 반환
        dateOfMoreData.getDate() > dateOfFewerData.getDate() && valueOfMoreData
      );
    }
    return null;
  });
};

// 배열 내부 객체의 created_at을 기준으로 최신순으로 배열을 정렬한다.
export const orderByDate = (array: any[]) =>
  array.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return dateB.getDate() - dateA.getDate();
  });

// 두 배열을 비교하여 데이터를 최신순으로 정렬하고 비교하는 함수를 실행한다.
export const compareDiaries = (prev: DiaryType[], cur: DiaryType[]) => {
  // 새로 업데이트된 데이터가 있는지 비교
  const isUpdated = prev.length !== cur.length;

  // 새로 업데이트된 데이터가 있으면 배열을 최신순으로 정렬하고(orderByDate),
  // 날짜를 비교하여 (compareDate) 최신의 데이터를 비교하여 반환한다.
  return isUpdated && compareDate(orderByDate(prev), orderByDate(cur));
};
