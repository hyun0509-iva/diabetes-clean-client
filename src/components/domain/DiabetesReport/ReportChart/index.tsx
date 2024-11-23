import { QUERY_KEY } from "constants/query_key";
import { useAPIByParamQuery } from "hooks/service/queries";
import { Idiabetes, IDiabetesResponse } from "models/data";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line
} from "recharts";
import userState from "store/userState";
import { getDiabetesAPI } from "utils/apis/diabetes";
import navLinkState from "store/navLinkState";
import dataFilter from "../utils/dataFilter";
import {
  CustomLegendWrap,
  DetailDescBlock,
  ReportChartBlock,
  ReportChartWrap
} from "../style";
import { useEffect } from "react";
import dayjs from "dayjs";

const { DIABETES_KEY } = QUERY_KEY;

const ReportChart = () => {
  const { targetLinkIdx, setTargetLinkIdx } = navLinkState();
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const { data } = useAPIByParamQuery<IDiabetesResponse>(
    userId,
    DIABETES_KEY,
    getDiabetesAPI
  );

  useEffect(() => {
    return () => {
      setTargetLinkIdx(0);
    };
  }, [setTargetLinkIdx]);

  const filteredData =
    data && dataFilter(targetLinkIdx as number, data.diabetes as Idiabetes[]);

  // 당수치 값에 따른 dot 색상 결정 함수
  const getDotColor = (sugarLevel: number) => {
    if (sugarLevel < 100) return "#FFA500"; // 주황
    if (sugarLevel > 140) return "#FF0000"; // 빨강
    return "#008000"; // 초록
  };

  const customTooltip1 = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div>평균 수치</div>
          <div>{payload[0].value}mg/dl</div>
        </div>
      );
    }
    return null;
  };

  const customTooltip2 = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div>{payload[0].payload.slot}</div>
          <div>{payload[0].value}mg/dl</div>
        </div>
      );
    }
    return null;
  };

  // 커스텀 범례 컴포넌트
  const CustomLegend = () => (
    <CustomLegendWrap>
      {[
        { id: 1, color: "#FF0000", label: "고혈당(위험)" },
        { id: 2, color: "#008000", label: "정상" },
        { id: 3, color: "#FFA500", label: "저혈당(위험)" }
      ].map(({ id, color, label }) => (
        <div key={id} className="label_item">
          <div className="line" style={{ backgroundColor: color }} />
          {label}
        </div>
      ))}
    </CustomLegendWrap>
  );

  const renderChart = (xKey?: string, elIdx?: number) => (
    <ComposedChart className="chart" data={filteredData as Idiabetes[]}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey={xKey || "slot"} />

      <YAxis
        domain={[0, (dataMax: number) => dataMax + 200]}
        label={{ value: "mg/dl", angle: -90, position: "insideLeft" }}
      />
      {elIdx ? (
        <>
          <YAxis
            yAxisId="sugar_level"
            orientation="right"
            domain={[0, (dataMax: number) => dataMax + 2]}
            label={{ value: "%", angle: 90, position: "insideRight" }}
          />
          <Tooltip
            content={customTooltip1}
            offset={10}
            cursor={{ strokeWidth: 1, stroke: "#868e96" }}
          />
          <Bar
            dataKey="sugar_level"
            name="당수치 추세"
            barSize={5}
            fill="none"
          />
          <Line
            type="monotone"
            dataKey="sugar_level"
            stroke="#74716f"
            legendType="none"
            fill="transparent"
            dot={(props: any) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={getDotColor(payload.sugar_level)}
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log(payload.createdAt)}
                />
              );
            }}
            activeDot={{
              r: 8,
              fill: "none",
              stroke: "#74716f",
              strokeWidth: 1
            }}
          />
        </>
      ) : (
        <>
          <Tooltip content={customTooltip2} offset={10} cursor={false} />
          <Bar
            dataKey="sugar_level"
            name={`당수치 (${dayjs().format("YY.MM.DD")})`}
            barSize={0}
            fill="none"
          />
          <Bar
            dataKey="sugar_level"
            legendType="none"
            barSize={15}
            fill="#5ea7d1"
          />
        </>
      )}
      <Legend verticalAlign="top" height={30} />
    </ComposedChart>
  );

  console.log({ origin: data, filteredData });

  return (
    <>
      {targetLinkIdx ? <CustomLegend /> : null}
      <ReportChartBlock>
        <ReportChartWrap width="100%" height={400}>
          {filteredData?.length ? (
            renderChart(targetLinkIdx > 0 ? "createdAt" : "slot", targetLinkIdx)
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {filteredData && "기록된 데이터가 없습니다."}
            </div>
          )}
        </ReportChartWrap>
      </ReportChartBlock>
      {true && (
        <DetailDescBlock>
          <div>정상수치기준: 100 ~ 140mg/dl</div>
          <div>자세한 설명</div>
        </DetailDescBlock>
      )}
    </>
  );
};

export default ReportChart;
