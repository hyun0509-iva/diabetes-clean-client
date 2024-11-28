import { memo, useState, useRef, useCallback, Dispatch } from "react";
import { MdFolderOpen } from "react-icons/md";
import Button from "components/common/Button";
import { CloseBtn } from "components/common/Modal/styles";
import alertHandler from "utils/functions/alertHandler";
import { MAX_FILES_COUNT } from "constants/variables";
import { useUploadImage, useDeleteImage } from "hooks/service/mutator";
import {
  ImgUploadBox,
  DrapFileArea,
  ImageUploadForm,
  ThumbnailImg,
  UploadText
} from "./styles";
import { LoadingSpinner } from "styles/common";
import { IUploadedImg } from "models/data";

interface IProps {
  imageData: Array<IUploadedImg>;
  setImageData: Dispatch<React.SetStateAction<Array<IUploadedImg>>>;
}

const ImageUpload = ({ imageData, setImageData }: IProps) => {
  const [thumbnail, setThumbnail] = useState<Array<IUploadedImg>>(
    imageData || []
  );
  const inputFileRef = useRef<HTMLInputElement>(null);
  const uploadImageMutate = useUploadImage();
  const deleteImageMutate = useDeleteImage();

  const onChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files as FileList);
      if (files.length) {
        if (files.length > MAX_FILES_COUNT) {
          alertHandler.onToast({
            msg: "이미지 개수는 9개까지만 가능합니다.",
            icon: "warning"
          });
          return;
        }
        const fileToRead = files.slice(0, MAX_FILES_COUNT);
        fileToRead.forEach(async (file: File) => {
          const resData = await uploadImageMutate.mutateAsync(file);
          const uploadedImgUrl = {
            publicId: resData.public_id,
            assetId: resData.asset_id,
            url: resData.url,
            width: resData.width,
            height: resData.height
          };
          setThumbnail((prev) => [...prev, uploadedImgUrl]);
          setImageData((prev) => [...prev, uploadedImgUrl]);
        });
      }
    },
    [setImageData, uploadImageMutate]
  );
  const onClickFileInput = useCallback(() => {
    inputFileRef?.current?.click();
  }, []);

  const onCancelImageUpload = useCallback(
    async (targetImg: any) => {
      if (thumbnail?.length) {
        console.log("이미지 삭제");
        await deleteImageMutate.mutateAsync(targetImg.publicId);
        setThumbnail((prev: any) =>
          prev.filter((origin: any) => origin.publicId !== targetImg.publicId)
        );
        setImageData((prev: any) =>
          prev.filter((origin: any) => origin.publicId !== targetImg.publicId)
        );
      }
    },
    [setImageData, thumbnail]
  );

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
                    uploadImageMutate.isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <MdFolderOpen />
                        <span>파일 선택</span>
                      </>
                    )
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
              {thumbnail.map((image: IUploadedImg, idx: number) => (
                <li key={image.publicId}>
                  <CloseBtn type="button">
                    <span onClick={() => onCancelImageUpload(image)}>
                      &times;
                    </span>
                  </CloseBtn>
                  <img src={image.url} alt="postImg" />
                </li>
              ))}
            </ul>
          </ThumbnailImg>
        ) : null}
      </ImageUploadForm>
    </>
  );
};

export default memo(ImageUpload);
