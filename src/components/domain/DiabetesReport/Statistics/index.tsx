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
      { id: 1, label: "오늘" },
      { id: 2, label: "주간" },
      { id: 3, label: "한달" },
      { id: 4, label: "3개월" },
      { id: 5, label: "기간 선택" }
    ],
    []
  );

  return (
    <StatisticsWrap>
      <StatisticsHeader>
        <h2 className="title">당수치 통계</h2>
        <div>범위</div>
        <NavMenu
          lists={periods}
          borderColor={palette.gray[5]}
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
