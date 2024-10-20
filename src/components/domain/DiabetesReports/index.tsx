import { Container, Contour } from "styles/common";
import DiabetesStatus from "./DiabetesStatus";
import DiabetesReport from "./DiabetesReport";
const DiabetesReports = () => {
  return (
    <Container>
      <DiabetesReport />
      <Contour />
      <DiabetesStatus />
    </Container>
  );
};

export default DiabetesReports;
