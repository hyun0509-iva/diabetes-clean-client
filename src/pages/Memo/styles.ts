import styled from "@emotion/styled";

export const MemoHeader = styled.header`
  .memo-title {
    padding: 20px 0;
    font-size: 20px;
  }
`;

// -- [ submenu ] --
export const SubmenuContainer = styled.nav`
  width: 100%;
  padding: 5px;
`;

// -- [ DateArea ] --
export const DateAreaContainer = styled.div`
  width: 100%;
  margin-top: 10px;
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

// -- [ MemoContents ] --
export const MemoContents = styled.section`
  margin-top: 30px;

  .contents-container {
    min-width: 97%;
    margin: 0 auto;
    width: 260px;
  }
`;

// -- [ ContentsList ] --
export const ContentsList = styled.div`
  margin-bottom: 30px;
`;

// -- [ ContentsItem ] --
export const ContentsItem = styled.div`
  padding: 15px;
  margin-top: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.middle};
  cursor: pointer;
`;

// -- [ ContentsItemHeader ] --
export const ContentsItemHeader = styled.header``;

// -- [ ContentsItemBody ] --
export const ContentsItemBody = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;

  .content_body-header {
    display: flex;

    .item-icon {
      line-height: 22px;
    }
    .item-title {
      padding-left: 5px;
    }
  }

  .content_body-inner {
  }
`;
