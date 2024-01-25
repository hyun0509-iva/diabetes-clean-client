import { theme } from "libs/palette";
import styled from "@emotion/styled";

export const ProfileBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 30px 0px;
  box-shadow: ${theme.boxShadow.light};
`;

export const ProfileContainer = styled.div`
  padding: 45px 0;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  gap: 20px;
  border-radius: 5px;
  .profile-img {
    position: relative;
    left: 0;
    top: 0;
  }
  .prof_btn {
    position: absolute;
    right: 18px;
    bottom: 8px;
    display: block;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #f8f9fa;
    }

    &:active {
      margin-top: -2px;
    }
  }
`;
export const UserInfo = styled.div`
  padding: 5px 15px;
  width: 100%;
  font-size: 18px;

  .Info_block {
    &:nth-of-type(1) {
      margin-bottom: 30px;
    }
  }
  .info_title {
    margin-bottom: 10px;
  }
  .info_cont {
    padding: 10px;
    box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 8%);

    &.about_me {
      height: 300px;
      overflow-y: auto;
    }
    &.edit_mode {
      outline: none;
      border: 1px solid gray;
      display: block;
      width: 370px;
      padding: 10px;
      font-size: 18px;
      box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 8%);
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 0 15px;
  width: 100%;

  button {
    display: inline-block;
    width: 49%;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 0 0 rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 10%);
    cursor: pointer;

    &:hover {
      background: rgb(0 0 0 / 10%);
    }

    &:active {
      margin-top: -2px;
    }
  }
`;
