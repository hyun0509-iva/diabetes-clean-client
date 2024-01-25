import styled from "@emotion/styled";
import { DiabetesItemWrap } from "components/domain/Memo/styles";

export const DetailContainer = styled(DiabetesItemWrap)`
  padding: 30px 20px;
  width: 500px;
  cursor: default;
`;

export const DetailModalHeader = styled.div`
  position: relative;
  padding: 15px 0px;
  border-bottom: 1px solid #e4e4e4;
  font-size: 17px;

  .btn_ctrl {
    position: absolute;
    top: 0;
    right: 0;

    button {
      margin-left: 5px;
      padding: 0 5px;
      display: inline-block;
      background: transparent;
      border: none;
      cursor: pointer;

      .btn_icon {
      }
    }
  }
  .date {
    span:last-child {
      font-size: 15px;
      color: #3e3e3e;
    }
  }
`;
export const DetailModalContent = styled.div`
  width: 100%;
  padding: 15px 0px;

  .sugar_level {
    width: 100%;
    display: flex;

    .left {
      flex: 1;
      padding: 15px 0;
      gap: 10px;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;
      padding-right: 18px;
    }
  }

  .note {
    margin-top: 15px;
    padding: 10px;
    height: 300px;
    border: 1px solid gray;
  }
`;
