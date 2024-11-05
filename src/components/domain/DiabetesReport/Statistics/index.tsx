import { useMemo } from "react";
import NavMenu from "components/common/NavMenu";
import ReportChart from "components/domain/DiabetesReport/ReportChart";
import { palette } from "libs/palette";
import {
  StatisticsWrap,
  StatisticsHeader,
  StatisticsContent
} from "components/domain/DiabetesReport/style";

const Statistics = () => {
  const periods = useMemo(
    () => [
      { id: 1, label: "오늘", url: "/report" },
      { id: 2, label: "한 주", url: "/report" },
      { id: 3, label: "한 달", url: "/report" },
      { id: 4, label: "3개월", url: "/report" }
    ],
    []
  );

  return (
    <StatisticsWrap>
      <StatisticsHeader>
        <h1 className="title">당수치 통계</h1>
        <div>범위</div>
        <NavMenu
          lists={periods}
          borderColor={palette.indigo[3]}
          fontSize={"18px"}
        />
      </StatisticsHeader>
      <StatisticsContent>
        <ReportChart />
      </StatisticsContent>
    </StatisticsWrap>
  );
};

export default Statistics;
