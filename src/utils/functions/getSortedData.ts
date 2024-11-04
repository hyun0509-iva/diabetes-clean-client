import dayjs from "dayjs";
import { IDiabetesResponse } from "models/data";

export interface ISortedData {
  [key: string]: IDiabetesResponse[];
}

/**
 * 날짜별로 정렬해주는 함수 구현
 * @param {IDiabetesResponse[]} originData
 * @returns {ISortedData}
 */
export const getSortedData = (originData: IDiabetesResponse[]): ISortedData => {
  const sortedObj: { [key: string]: IDiabetesResponse[] } = {};
  originData.forEach((item: IDiabetesResponse) => {
    const createdDate = dayjs(item.createdAt).format("YYYY-MM-DD dddd");
    if (Array.isArray(sortedObj[createdDate])) {
      sortedObj[createdDate].push(item);
    } else {
      sortedObj[createdDate] = [item];
    }
  });
  return sortedObj;
};
