import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const SearchHospWarp = styled.div`
  padding: 15px 30px;
  display: flex;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
`;

export const LeftHospList = styled.div`
  padding: 0 15px;
  flex: 3;
  height: 750px;
  .hosp_menu {
    display: flex;
    flex-direction: column;
    padding: 15px 0px;
  }

  .hosp_menu_item {
    padding: 10px;
    border: 1px solid ${palette.gray[3]};
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    .hosp_name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .detail_info {
      font-size: 15px;
      font-weight: 300;
    }
  }
`;

export const HospContents = styled.div`
  padding: 15px;
  height: 900px;
  flex: 10;

  .hosp_map {
    height: 500px;
  }
`;
