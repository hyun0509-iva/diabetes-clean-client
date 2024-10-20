import styled from "@emotion/styled";

export const HospList = styled.div`
  flex: 2;
  height: 750px;
  overflow: auto;
  padding: 0 15px;

  h2 {
    margin-top: 20px;
  }

  .hosp_menu {
    display: flex;
    flex-direction: column;
    padding: 15px 0px;
  }

  .hosp_menu_item {
    padding: 10px;
    border: 1px solid #ced4da;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    cursor: pointer;

    &:hover,
    &.selected {
      background: #d2d2d2;
      box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 20%);
    }

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
