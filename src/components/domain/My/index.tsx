import UserProfile from "./UserProfile";
import DiabetesReport from "./DiabetesReport";
import DiabetesStatus from "./DiabetesStatus";
import { MyContainer } from "./styles";
import { Contour } from "styles/common";

const My = () => {
  return (
    <MyContainer>
      <UserProfile />
      <Contour />
      <DiabetesReport />
      <Contour />
      <DiabetesStatus />
    </MyContainer>
  );
};

export default My;
