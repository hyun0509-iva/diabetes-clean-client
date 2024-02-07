import { useState, useCallback } from "react";
import gravatar from "gravatar";
import { MdEdit } from "react-icons/md";
import Button from "components/common/Button";
import Avatar from "components/common/Avatar";
import SubMenu from "components/common/SubMenu";
import { useUpdateUser, useUploadImage } from "hooks/service/mutator";
import userState from "store/userState";
import {
  ProfileImgBtn,
  UserImageWrap
} from "components/domain/My/UserProfile/styles";

const UserProfileImage = () => {
  const { userInfo: me, setUserInfo } = userState();
  const [showProfileSubMenu, setShowProfileSubMenu] = useState(false);

  const [isUploadmode, setIsUploadMode] = useState(false);
  const [isActiveProfileImage, setIsActiveProfileImage] = useState(true);
  const [thumbnail, setThumbnail] = useState<string | null>(me?.imageSrc ?? "");
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const updateUserMutate = useUpdateUser();
  const uploadImageMutate = useUploadImage();

  const onShowProfileSubMenu = useCallback(() => {
    setShowProfileSubMenu((prev) => !prev);
  }, []);

  const onCloseMenu = useCallback(() => {
    setShowProfileSubMenu(false);
  }, []);

  const onChangeImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      // TODO: 이미지 업로드 로직 추가하기.
      const file = (e.currentTarget.files as FileList)[0];
      if (file) {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener(
          "loadend",
          (e: ProgressEvent<FileReader>) => {
            const { result } = e.currentTarget as FileReader;
            setThumbnail(result as string);
            setFileImage(file);
            setIsUploadMode(true);
            onCloseMenu();
          }
        );
      }
    },
    []
  );

  const onUploadImage = useCallback(() => {
    console.log("스토리지에 이미지 저장");

    if (fileImage) {
      uploadImageMutate.mutate(fileImage, {
        onSuccess: (data) => {
          setProfileImageUrl(data.url);
          setIsActiveProfileImage(false);
          setIsUploadMode(false);
          onCloseMenu();
        }
      });
    }
  }, [fileImage]);

  const onUpdateUserProfileImage = useCallback(
    (e: any) => {
      console.log(e.target.name);
      console.log("user db 수정");
      if (profileImageUrl) {
        const userData = { imageSrc: profileImageUrl as string };
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
      console.log({ profileImageUrl });
    },
    [profileImageUrl]
  );

  const onDeleteUserProfileAndUpLoadImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // TODO: 이미지 삭제 로직 추가하기. - 스토리지와 디비에서 이미지 삭제하기.
      console.log("이미지 삭제");
    },
    []
  );

  return (
    <UserImageWrap>
      <Button
        className="prof_btn"
        context={<MdEdit color="#232" />}
        onClick={onShowProfileSubMenu}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <input
        type="file"
        id="image"
        accept="image/jpg,image/png,image/jpeg,image/gif"
        style={{ display: "none" }}
        onChange={onChangeImg}
      />
      <Avatar
        size={160}
        imgUrl={
          me?.imageSrc
            ? `${thumbnail ? thumbnail : me?.imageSrc}`
            : thumbnail
            ? `${thumbnail}`
            : gravatar.url(me?.email as string, {
                s: "170px",
                d: "retro"
              })
        }
      />
      {showProfileSubMenu && (
        <SubMenu
          menuItem={[
            {
              id: 1,
              path: null,
              label: isUploadmode ? (
                <button onClick={onUploadImage}>이미지 업로드</button>
              ) : (
                <label htmlFor="image">이미지 수정</label>
              ),
              handler: null
            },
            {
              id: 2,
              path: null,
              label: "취소",
              handler: () => onCloseMenu()
            }
          ]}
          showSubMenu={showProfileSubMenu}
          onCloseMenu={onCloseMenu}
          customCss={{
            posX: "78px",
            posY: "115px"
          }}
        />
      )}
      <ProfileImgBtn>
        <div className="profile_img_btn_group">
          <Button
            type="button"
            context="사진 삭제"
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
