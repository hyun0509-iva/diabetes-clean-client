import { Dispatch, memo, useState, useRef, useCallback } from "react";

import {
  ImgUploadBox,
  DrapFileArea,
  ImageUploadForm,
  ThumbnailImg
} from "./styles";
import Button from "components/common/Button";

interface IProps {
  imageUrl: string;
  setImgUrl: Dispatch<React.SetStateAction<string>>;
  setImgFileName: Dispatch<React.SetStateAction<string>>;
}

const ImageUpload = ({ imageUrl, setImgUrl, setImgFileName }: IProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(imageUrl || "");

  const onChangeImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    if (file) {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("loadend", (e: ProgressEvent<FileReader>) => {
        const { result } = e.currentTarget as FileReader;
        setThumbnail(result as string);
      });
    }
  }, []);
  const onClickFileInput = useCallback(() => {
    inputFileRef?.current?.click();
  }, []);

  const onCancelImageUpload = useCallback(() => {
    if (thumbnail) {
      setThumbnail("");
      setImgUrl("");
      setImgFileName("");
      //TODO: 이미지 업로드:삭제 부분 로직 작성하기
    }
  }, [setImgFileName, setImgUrl, thumbnail]);

  //TODO: 이미지 업로드: 생성 부분 로직 작성하기
  return (
    <>
      <Button
        text="이미지 취소"
        type="button"
        onClick={onCancelImageUpload}
        style={{ position: "absolute", right: 10, top: 10 }}
      />
      <ImageUploadForm>
        <ImgUploadBox>
          <DrapFileArea onClick={onClickFileInput}>
            {thumbnail ? (
              <ThumbnailImg>
                <img src={thumbnail} alt="" />
              </ThumbnailImg>
            ) : (
              <>
                <div className="icon-wrap">
                  <img
                    src="https://img.icons8.com/ios/512/image--v1.png"
                    alt="file-icon"
                    className="img"
                  />
                </div>
                <span className="upload-msg">
                  클릭해서 직접 업로드하거나
                  <br />
                  이미지를 끌어다 놓으세요
                </span>
              </>
            )}
            <input
              multiple
              name="imgUpload"
              type="file"
              accept="image/gif, image/jpeg, image/png"
              onChange={onChangeImg}
              ref={inputFileRef}
            />
          </DrapFileArea>
        </ImgUploadBox>
      </ImageUploadForm>
    </>
  );
};

export default memo(ImageUpload);
