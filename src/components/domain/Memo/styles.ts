import styled from "@emotion/styled";

export const MemoHeader = styled.header`
  .memo-title {
    padding: 20px 5px;
    font-size: 20px;
  }
`;

// -- [ submenu ] --
export const SubmenuContainer = styled.nav`
  width: 100%;
  padding: 5px;

  .menu {
    display: flex;
  }
  .menu-item {
    padding: 3px 5px;
    cursor: pointer;
    &:nth-of-type(2) {
      margin-left: 15px;
    }
  }
`;

// -- [ DateArea ] --
export const DateAreaContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dateCtrlBtn {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    line-height: 10px;
    cursor: pointer;
  }

  .dateCtrlBtn:active {
    opacity: 0.8;
  }

  .dateText-wrap {
    font-size: 18px;
    font-weight: bold;
    line-height: 44px;
  }
`;

export const MemoContents = styled.section`
  margin: 0 auto;
  min-width: 97%;
  width: 260px;
`;

export const DiabetesListWrap = styled.div`
  margin-bottom: 30px;
`;

export const DiabetesItemContainer = styled.div`
  margin-bottom: 45px;
`;

export const DiabetesItemWrap = styled.div`
  padding: 10px 15px;
  margin-top: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.middle};
  cursor: pointer;
`;

export const ItemBodyWrap = styled.div`
  display: flex;
  justify-content: space-between;

  .item-slot {
    padding-left: 8px;
  }
`;
