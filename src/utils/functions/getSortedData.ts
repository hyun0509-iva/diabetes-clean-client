import dayjs from "dayjs";
import { IDiabetesInfo } from "models/data";

export interface ISortedData {
  [key: string]: IDiabetesInfo[];
}

/**
 * 날짜별로 정렬해주는 함수 구현
 * @param {IDiabetesInfo[]} originData
 * @returns {ISortedData}
 */
export const getSortedData = (originData: IDiabetesInfo[]): ISortedData => {
  const sortedObj: { [key: string]: IDiabetesInfo[] } = {};
  originData.forEach((item: IDiabetesInfo) => {
    const createdDate = dayjs(item.createdAt).format("YYYY-MM-DD dddd");
    if (Array.isArray(sortedObj[createdDate])) {
      sortedObj[createdDate].push(item);
    } else {
      sortedObj[createdDate] = [item];
    }
  });
  return sortedObj;
};
