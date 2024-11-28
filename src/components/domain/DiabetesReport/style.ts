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
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 12px;
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

export const ReportChartBlock = styled.div`
  padding: 12px;
  border: 1px solid #c2c2c2;
`;

export const DetailDescBlock = styled(ReportChartBlock)`
  margin: 0;
`;

export const ReportChartWrap = styled(ResponsiveContainer)`
  .custom-tooltip {
    width: auto;
    margin-left: 5px;
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    margin-top: 50px;
    padding: 12px;
    border: 1px solid #c2c2c2;
  }
`;

export const CustomLegendWrap = styled.div`
  position: relative;
  top: 0;
  left: 530px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 20px;
  margin-top: -20px;

  .label_item {
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  .label_item > .line {
    width: 20px;
    height: 2px;
    margin-right: 4px;
  }
`;
