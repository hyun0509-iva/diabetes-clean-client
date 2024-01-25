import styled from "@emotion/styled";

export const ImageUploadForm = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 20px 10px;
`;

export const ImgUploadBox = styled.div`
  position: relative;
  width: 100%;
  border: 2px dashed #d2d1d1;
`;

export const DrapFileArea = styled.div`
  width: 90%;
  height: 266px;
  padding: 36px 0 76px;
  margin: 0 auto;
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
  .upload-msg {
    position: absolute;
    font-size: 14px;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
  }

  input {
    display: none;
  }
`;

export const ThumbnailImg = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: 100%;
  }
`;
