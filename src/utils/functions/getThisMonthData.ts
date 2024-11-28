import dayjs from "dayjs";
import { Idiabetes } from "models/data";

/**
 * 월별로 정렬해주는 함수 구현
 * @param {dayjs.Dayjs | string | number} curDate
 * @param {Idiabetes[]} data
 * @returns {Idiabetes[]}
 */

export const getThisMonthData = (
  data: Idiabetes[],
  curDate: dayjs.Dayjs | string | number
): Idiabetes[] => {
  console.log({ getThisMonthData: data });
  const startOfDate = dayjs(curDate).startOf("month").format("YYYYMMDD");
  const endOfDate = dayjs(curDate).endOf("month").format("YYYYMMDD");

  return data.filter((item: Idiabetes) => {
    const fomattedCreatedAt = dayjs(item.createdAt).format("YYYY-MM-DD");
    const date = parseInt(fomattedCreatedAt.split("-").join(""), 10);
    if (Number(startOfDate) <= date && date <= Number(endOfDate)) {
      return item;
    }
  });
};
