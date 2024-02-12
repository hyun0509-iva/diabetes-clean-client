import { useState, useCallback, useRef } from "react";
import gravatar from "gravatar";
import { MdEdit } from "react-icons/md";
import Button from "components/common/Button";
import Avatar from "components/common/Avatar";
import {
  useDeleteImage,
  useUpdateUser,
  useUploadImage
} from "hooks/service/mutator";
import userState from "store/userState";
import {
  ProfileImgBtn,
  UserImageWrap
} from "components/domain/My/UserProfile/styles";
import { IUploadedImg } from "models/data";

const UserProfileImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { userInfo: me, setUserInfo } = userState();

  // isActiveProfileImage: 사진 적용할지에 대한 상태
  // ㄴ true: 사진 적용 버튼 비활성화, false: 사진 적용 버튼 활성화
  const [isActiveProfileImage, setIsActiveProfileImage] = useState(true);

  // thumbnail: 이미지 미리보기에 대한 상태
  const [thumbnail, setThumbnail] = useState<IUploadedImg | null>(
    me?.imageData ?? null
  );
  const [profileImageUrl, setProfileImageUrl] = useState<IUploadedImg | null>(
    null
  );

  const updateUserMutate = useUpdateUser();
  const uploadImageMutate = useUploadImage();
  const deleteImageMutate = useDeleteImage();

  /* 사진 선택하기 */
  const onChangeImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.currentTarget.files as FileList)[0];
    console.log("실행", file);
    if (file) {
      uploadImageMutate.mutate(file, {
        onSuccess: (data) => {
          const {
            public_id: publicId,
            asset_id: assetId,
            original_filename: fileName,
            url,
            width,
            height
          } = data;

          setProfileImageUrl({
            publicId,
            assetId,
            fileName,
            url,
            width,
            height
          });
          setThumbnail({
            publicId,
            assetId,
            fileName,
            url,
            width,
            height
          });
          setIsActiveProfileImage(false);
        }
      });
    }
  }, []);

  const onUpdateUserProfileImage = useCallback(
    (e: any) => {
      if (profileImageUrl?.publicId) {
        console.log({ profileImageUrl });
        const userData = { imageData: profileImageUrl };
        updateUserMutate.mutate(
          {
            userId: me?._id as string,
            userData
          },
          {
            onSuccess: () => {
              setIsActiveProfileImage(true);
              setUserInfo(userData);
            }
          }
        );
      }
    },
    [profileImageUrl]
  );

  const onDeleteUserProfileAndUpLoadImage = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      // TODO: 사진 삭제 로직 추가하기. - 스토리지와 디비에서 사진 삭제하기.
      console.log("사진 삭제");
      if (thumbnail) {
        console.log(thumbnail.publicId);
        const result = await deleteImageMutate.mutateAsync(thumbnail.publicId);
        if (result) {
          const userData = {
            imageData: {
              publicId: "",
              assetId: "",
              fileName: "",
              url: "",
              width: "",
              height: ""
            }
          };
          updateUserMutate.mutate(
            {
              userId: me?._id as string,
              userData
            },
            {
              onSuccess: () => {
                setIsActiveProfileImage(true);
                setUserInfo(userData);
                setThumbnail(userData.imageData);
              }
            }
          );
        }
      }
    },
    [thumbnail]
  );

  console.log(thumbnail);

  return (
    <UserImageWrap>
      <Button
        className="prof_btn"
        context={<MdEdit color="#232" />}
        onClick={() => inputRef?.current?.click()}
        onMouseDown={(e) => e.stopPropagation()}
      />

      <input
        type="file"
        id="image"
        accept="image/jpg,image/png,image/jpeg,image/gif"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onChangeImg}
      />
      <Avatar
        size={160}
        imgUrl={
          me?.imageData && me?.imageData.url !== ""
            ? me?.imageData?.url
            : thumbnail && thumbnail.url !== ""
            ? thumbnail?.url
            : gravatar.url(me?.email as string, {
                s: "170px",
                d: "retro"
              })
        }
      />

      <ProfileImgBtn>
        <div className="profile_img_btn_group">
          <Button
            type="button"
            context="사진 삭제"
            disabled={!me?.imageData?.url}
            onClick={onDeleteUserProfileAndUpLoadImage}
          />
          <Button
            type="button"
            context="사진 적용"
            disabled={isActiveProfileImage}
            onClick={onUpdateUserProfileImage}
          />
        </div>
      </ProfileImgBtn>
    </UserImageWrap>
  );
};

export default UserProfileImage;
