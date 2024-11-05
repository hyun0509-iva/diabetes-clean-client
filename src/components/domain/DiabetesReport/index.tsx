import { Wapper, Contour } from "styles/common";
import DiabetesStatus from "./DiabetesStatus";
import Statistics from "./Statistics";
const DiabetesReport = () => {
  return (
    <Wapper>
      <Statistics />
      <Contour />
      <DiabetesStatus />
    </Wapper>
  );
};

export default DiabetesReport;
