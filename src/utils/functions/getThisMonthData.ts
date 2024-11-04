import dayjs from "dayjs";
import { IDiabetesResponse } from "models/data";

/**
 * 월별로 정렬해주는 함수 구현
 * @param {dayjs.Dayjs | string | number} curDate
 * @param {IDiabetesResponse[]} data
 * @returns {IDiabetesResponse[]}
 */

export const getThisMonthData = (
  data: IDiabetesResponse[],
  curDate: dayjs.Dayjs | string | number
): IDiabetesResponse[] => {
  console.log({ getThisMonthData: data });
  const startOfDate = dayjs(curDate).startOf("month").format("YYYYMMDD");
  const endOfDate = dayjs(curDate).endOf("month").format("YYYYMMDD");

  return data.filter((item: IDiabetesResponse) => {
    const fomattedCreatedAt = dayjs(item.createdAt).format("YYYY-MM-DD");
    const date = parseInt(fomattedCreatedAt.split("-").join(""), 10);
    if (Number(startOfDate) <= date && date <= Number(endOfDate)) {
      return item;
    }
  });
};
