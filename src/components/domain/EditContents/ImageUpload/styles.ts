import styled from "@emotion/styled";

export const ImageUploadForm = styled.div`
  width: 100%;
  padding: 20px 0px;
`;

export const ImgUploadBox = styled.div`
  position: relative;
  width: 100%;
  border: 2px dashed #d2d1d1;
`;

export const DrapFileArea = styled.div`
  width: 90%;
  height: 150px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .icon-wrap {
    justify-content: center;
    display: flex;
    opacity: 0.1;
  }

  .img {
    width: 150px;
    height: 150px;
    display: block;
  }
  input {
    display: none;
  }
`;

export const UploadText = styled.div`
  .upload_btn_wrap {
    display: flex;
    justify-content: center;
  }
  .upload_btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    width: 115px;
    padding: 10px;
  }

  .upload_msg {
    margin-top: 15px;
    display: inline-block;
  }
`;

export const ThumbnailImg = styled.div`
  margin-top: 30px;
  position: relative;
  top: 0;
  left: 0;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  li {
    position: relative;
    margin-top: 20px;
    width: 195px;
    height: 195px;
    box-shadow: ${({ theme }) => theme.boxShadow.light};
  }

  button {
    position: absolute;
    background-color: #fff;
    top: -11px;
    right: -6px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
