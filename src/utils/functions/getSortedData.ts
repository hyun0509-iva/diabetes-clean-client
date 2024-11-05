import dayjs from "dayjs";
import { Idiabetes } from "models/data";

export interface ISortedData {
  [key: string]: Idiabetes[];
}

/**
 * 날짜별로 정렬해주는 함수 구현
 * @param {IDiabetesResponse[]} originData
 * @returns {ISortedData}
 */
export const getSortedData = (originData: Idiabetes[]): ISortedData => {
  const sortedObj: { [key: string]: Idiabetes[] } = {};
  originData.forEach((item: Idiabetes) => {
    const createdDate = dayjs(item.createdAt).format("YYYY-MM-DD dddd");
    if (Array.isArray(sortedObj[createdDate])) {
      sortedObj[createdDate].push(item);
    } else {
      sortedObj[createdDate] = [item];
    }
  });
  return sortedObj;
};
