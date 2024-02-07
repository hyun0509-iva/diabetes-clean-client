import { Dispatch, memo, useState, useRef, useCallback } from "react";
import { MdFolderOpen } from "react-icons/md";
import {
  ImgUploadBox,
  DrapFileArea,
  ImageUploadForm,
  ThumbnailImg,
  UploadText
} from "./styles";
import Button from "components/common/Button";
import { CloseBtn } from "components/common/Modal/styles";
import alertHandler from "utils/functions/alertHandler";
import { MAX_FILES_COUNT } from "constants/variables";

interface IProps {
  imageUrl: Array<string> | string;
  setImgUrl: Dispatch<React.SetStateAction<string>>;
  setImgFileName: Dispatch<React.SetStateAction<string>>;
  thumbnail: string | Array<string> | null;
  setThumbnail: React.Dispatch<
    React.SetStateAction<string | Array<string> | null>
  >;
}

const ImageUpload = ({
  imageUrl,
  setImgUrl,
  setImgFileName,
  thumbnail,
  setThumbnail
}: IProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onChangeImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    if (files.length) {
      const filesArr: Promise<string>[] = [];
      if (files.length > MAX_FILES_COUNT) {
        alertHandler.onToast({
          msg: "이미지 개수는 9개까지만 가능합니다.",
          icon: "warning"
        });
        return;
      }
      const fileToRead = files.slice(0, MAX_FILES_COUNT);
      fileToRead.forEach((file: File) => {
        const fileReader: FileReader = new FileReader();
        const promise = new Promise<string>((resolve, reject) => {
          fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
            const { result } = e.currentTarget as FileReader;
            if (result) {
              resolve(result as string);
            } else {
              reject(new Error("Failed to read file"));
            }
          };

          fileReader.readAsDataURL(file);
        });

        filesArr.push(promise);
      });

      Promise.all(filesArr)
        .then((imageUrls) => {
          setThumbnail(imageUrls);
        })
        .catch((error) => {
          console.error("파일을 읽는데 실패했습니다.:", error);
        });
    }
  }, []);
  const onClickFileInput = useCallback(() => {
    inputFileRef?.current?.click();
  }, []);

  const onCancelImageUpload = useCallback(
    (imgStr: string) => {
      if (thumbnail?.length) {
        setImgUrl("");
        setImgFileName("");

        const prev = thumbnail as Array<string>;
        setThumbnail(() => prev.filter((item) => item !== imgStr));
        //TODO: 이미지 업로드:삭제 부분 로직 작성하기
      }
    },
    [setImgFileName, setImgUrl, thumbnail]
  );

  //TODO: 이미지 업로드: 생성 부분 로직 작성하기
  return (
    <>
      <ImageUploadForm>
        <ImgUploadBox>
          <DrapFileArea
            onClick={() => {
              // console.log("이미지 드래그 로직");
              return null;
            }}
          >
            <UploadText>
              <div className="upload_btn_wrap">
                <Button
                  context={
                    <>
                      <MdFolderOpen />
                      <span>파일 선택</span>
                    </>
                  }
                  type="button"
                  className="upload_btn"
                  onClick={onClickFileInput}
                />
              </div>
              <div>
                <span className="upload_msg">
                  클릭해서 직접 업로드하거나
                  <br />
                  이미지를 끌어다 놓으세요
                </span>
              </div>
            </UploadText>
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
        {thumbnail?.length ? (
          <ThumbnailImg>
            <ul>
              {(thumbnail as Array<string>).map(
                (imgStr: string, idx: number) => (
                  <li key={idx}>
                    <CloseBtn type="button">
                      <span onClick={() => onCancelImageUpload(imgStr)}>
                        &times;
                      </span>
                    </CloseBtn>
                    <img src={imgStr} alt="" />
                  </li>
                )
              )}
            </ul>
          </ThumbnailImg>
        ) : null}
      </ImageUploadForm>
    </>
  );
};

export default memo(ImageUpload);
