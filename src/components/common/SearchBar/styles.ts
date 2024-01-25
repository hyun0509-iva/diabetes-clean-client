import styled from "@emotion/styled";

export const SearchForm = styled.form`
  width: 100%;

  .search-inner {
    display: flex;
    align-content: center;
    box-shadow: 0px 0px 6px 3px rgb(0 0 0 /10%);
  }
  .input-wrap {
    position: relative;
    flex: 10;
    width: 100%;
    height: 40px;
    border-radius: 4px;

    & input {
      padding: 0 5px;
      border: none;
      width: inherit;
      height: 100%;
      outline: none;
      font-size: 16px;
    }
    .clear-btn {
      position: absolute;
      right: 0;
      top: 0;
      text-align: center;
      line-height: 45px;
      width: 45px;
      height: 100%;
      border-radius: 50%;
      transition: all 0.1s ease-in;
      display: none;
      cursor: pointer;
    }

    .on {
      display: block;
    }
    .clear-btn:hover {
      background-color: #f1f3f5;
    }
  }
  .search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: #f1f3f5;
    border: none;
    cursor: pointer;
    &:active {
    }
    &:hover {
      background-color: #e9ecef;
    }
  }
`;
