import { useMemo } from "react";
import NavMenu from "components/common/NavMenu";
import ReportChart from "components/domain/My/ReportChart";
import { Title } from "components/domain/My/styles";
import { palette } from "libs/palette";
const DiabetesReport = () => {
  const periods = useMemo(
    () => [
      { id: 1, label: "오늘", url: "/mypage" },
      { id: 2, label: "한 주", url: "/mypage" },
      { id: 3, label: "한 달", url: "/mypage" },
      { id: 4, label: "3개월", url: "/mypage" }
    ],
    []
  );

  return (
    <div style={{ margin: "30px 0" }}>
      <Title>
        <span>당수치 통계</span>
      </Title>
      <div>
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
