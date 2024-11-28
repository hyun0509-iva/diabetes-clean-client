import dayjs from "dayjs";
import { Idiabetes } from "models/data";

const today = dayjs().format("YYYY-MM-DD");

/* 당수치 하루 평균 계산 */
const calculateDailyAverage = (data: Idiabetes[]) => {
  const dailyAverages: any = {};

  data.forEach((item) => {
    const date = item.createdAt.split(" ")[0];
    if (!dailyAverages[date]) {
      dailyAverages[date] = { total: 0, count: 0 };
    }
    dailyAverages[date].total += item.sugar_level;
    dailyAverages[date].count++;
  });

  const avgData = Object.entries(dailyAverages).map(([date, info]) => ({
    createdAt: date,
    sugar_level: Math.ceil((info as any).total / (info as any).count)
  }));

  console.log(avgData);
  return avgData;
};

const todayData = (data: Idiabetes[]) => {
  return data
    ?.filter((item) => dayjs(item.createdAt).format("YYYY-MM-DD") === today)
    .reverse();
};

const weeklyData = (data: Idiabetes[]) => {
  const origin = data
    ?.filter((item) => {
      const startOfDate = dayjs(today)
        .startOf("weeks")
        .format("YYYY-MM-DD")
        .split("-")
        .join("");
      const endOfDate = today.split("-").join("");

      const date = parseInt(
        dayjs(item.createdAt).format("YYYY-MM-DD").split("-").join(""),
        10
      );
      if (Number(startOfDate) <= date && date <= Number(endOfDate)) {
        return item;
      }
    })
    .reverse();

  return calculateDailyAverage(
    origin.map(
      (d): Idiabetes => ({
        ...d,
        createdAt: dayjs(d.createdAt).format("MM.DD")
      })
    )
  );
};

const monthlyData = (data: Idiabetes[]) => {
  const origin = data
    ?.filter((item) => {
      const startOfDate = dayjs(today)
        .startOf("month")
        .format("YYYY-MM-DD")
        .split("-")
        .join("");
      const endOfDate = today.split("-").join("");

      const date = parseInt(
        dayjs(item.createdAt).format("YYYY-MM-DD").split("-").join(""),
        10
      );
      if (Number(startOfDate) <= date && date <= Number(endOfDate)) {
        return item;
      }
    })
    .reverse();

  return calculateDailyAverage(
    origin.map(
      (d): Idiabetes => ({
        ...d,
        createdAt: dayjs(d.createdAt).format("MM.DD")
      })
    )
  );
};

const dataFilter = (idx: number, data: Idiabetes[]) => {
  // test();
  switch (idx) {
    case 0:
      return todayData(data);
    case 1:
      return weeklyData(data);
    case 2:
      return monthlyData(data);
    case 3:
      return [];
    default:
      return [];
  }
};

export default dataFilter;

function test() {
  interface DiabetesData {
    createdAt: string;
    slot: string;
    sugar_level: number;
    writer: { _id: string; nickname: string };
  }

  const generateData = (days: number): DiabetesData[] => {
    const data: DiabetesData[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // 하루에 3~4개 데이터 생성
      const slots = [
        "아침 식전",
        "아침 식후",
        "점심 식전",
        "점심 식후",
        "저녁 식전",
        "저녁 식후"
      ];
      const numMeasurements = Math.floor(Math.random() * 2) + 3;

      for (let j = 0; j < numMeasurements; j++) {
        data.push({
          createdAt:
            date.toISOString().split("T")[0] +
            " " +
            new Date().toTimeString().split(" ")[0],
          slot: slots[Math.floor(Math.random() * slots.length)],
          sugar_level: Math.floor(Math.random() * 100) + 80, // 80~180 사이
          writer: { _id: "67277368c526ce7aca296792", nickname: "이동현2123" }
        });
      }
    }

    return data;
  };

  // 기간별 데이터
  const todayData = generateData(1);
  const weekData = generateData(7);
  const monthData = generateData(30);
  const quarterData = generateData(90);

  // 기간별 평균 계산
  const calculateDailyAverage = (data: DiabetesData[]) => {
    const dailyAverages: any = {};

    data.forEach((item) => {
      const date = item.createdAt.split(" ")[0];
      if (!dailyAverages[date]) {
        dailyAverages[date] = { total: 0, count: 0 };
      }
      dailyAverages[date].total += item.sugar_level;
      dailyAverages[date].count++;
    });

    return Object.entries(dailyAverages).map(([date, info]) => ({
      date,
      averageSugarLevel: Math.ceil((info as any).total / (info as any).count)
    }));
  };

  const todayAverage = calculateDailyAverage(todayData);
  const weekAverage = calculateDailyAverage(weekData);
  const monthAverage = calculateDailyAverage(monthData);
  const quarterAverage = calculateDailyAverage(quarterData);
  console.log({ todayAverage, weekAverage, monthAverage, quarterAverage });
}

const dummy = [
  {
    createdAt: "2024-11-21 07:25:00",
    note: "test",
    slot: "아침 식전",
    sugar_level: 98
  },
  {
    createdAt: "2024-11-21 08:25:00",
    note: "test",
    slot: "아침 식후",
    sugar_level: 130
  },
  {
    createdAt: "2024-11-22 17:25:00",
    note: "test",
    slot: "저녁 식전",
    sugar_level: 120
  },
  {
    createdAt: "2024-11-23 20:25:00",
    note: "test",
    slot: "저녁 식전",
    sugar_level: 158
  },
  {
    createdAt: "2024-11-23 12:25:00",
    note: "test",
    slot: "아침 식후",
    sugar_level: 92
  },
  {
    createdAt: "2024-11-23 14:25:00",
    note: "test",
    slot: "아침 식후",
    sugar_level: 121
  }
];
