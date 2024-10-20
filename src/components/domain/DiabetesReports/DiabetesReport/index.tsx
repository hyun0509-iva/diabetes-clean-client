import { useMemo } from "react";
import NavMenu from "components/common/NavMenu";
import ReportChart from "components/domain/DiabetesReports/ReportChart";
import { Title } from "components/domain/My/styles";
import { palette } from "libs/palette";
const DiabetesReport = () => {
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
    <div style={{ margin: "30px 0" }}>
      <Title>
        <span>당수치 통계</span>
      </Title>
      <div>
        <div>범위</div>
        <NavMenu
          lists={periods}
          borderColor={palette.indigo[3]}
          fontSize={"18px"}
        />
        <ReportChart />
      </div>
    </div>
  );
};

export default DiabetesReport;
