import styled from "@emotion/styled";
import { ResponsiveContainer } from "recharts";
import { Wapper } from "styles/common";

export const StatisticsWrap = styled(Wapper)`
  margin-bottom: 30px;
`;

/* Statistics */
export const StatisticsHeader = styled.header`
  .title {
    padding: 20px 5px;
    font-size: 20px;
  }
`;

export const StatisticsContent = styled.div`
  margin-top: 50px;
  padding: 12px;
  border: 1px solid #c2c2c2;
`;

/* DiabetesStatus */
export const DiabetesStatusWrap = styled.div`
  margin: 30px 0;
  height: 150px;
`;

export const DiabetesStatusHeader = styled.div`
  .title {
    padding: 20px 5px;
    font-size: 20px;
  }
`;

export const ReportChartWrap = styled(ResponsiveContainer)``;
