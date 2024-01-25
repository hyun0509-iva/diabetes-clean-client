import { DIABETES_KEY } from "constants/query_key";
import dayjs from "dayjs";
import { useAPIByIdQuery } from "hooks/service/queries";
import { IDiabetesInfo, IDiabetesResponse } from "models/data";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import userState from "store/userState";
import { getDiabetes } from "utils/apis/diabetesApis";

const ReportChart = () => {
  const [today] = useState(dayjs().format("YYYY-MM-DD"));
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const { data: diabetesData } = useAPIByIdQuery<IDiabetesResponse>(
    userId,
    DIABETES_KEY,
    getDiabetes
  );
  const data = diabetesData?.diabetesInfo as IDiabetesInfo[];
  const todayData = useMemo(() => {
    return data
      ?.filter((item) => dayjs(item.createdAt).format("YYYY-MM-DD") === today)
      .reverse();
  }, [data, today]);
  // console.log(data, todayData);

  const weekData = useMemo(() => {
    return data
      ?.filter((item) => {
        const startOfDate = dayjs(today)
          .startOf("weeks")
          .format("YYYY-MM-DD")
          .split("-")
          .join("");
        const endOfDate = today.split("-").join("");

        const fomattedCreatedAt = dayjs(item.createdAt).format("YYYY-MM-DD");
        const date = parseInt(fomattedCreatedAt.split("-").join(""), 10);
        if (Number(startOfDate) <= date && date <= Number(endOfDate)) {
          return item;
        }
      })
      .reverse();
  }, [data, today]);
  const month = 0;
  const threeMonth = 0;
  return (
    <ResponsiveContainer height={400}>
      <ComposedChart className="chart" data={todayData}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="slot" /> */}
        <XAxis dataKey="slot" />
        <YAxis
          domain={[0, (dataMax: number) => dataMax + 200]}
          label={{ value: "mg/dl", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={30} />
        <Bar dataKey="sugar_level" name="당수치" barSize={20} fill="#5ea7d1" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
