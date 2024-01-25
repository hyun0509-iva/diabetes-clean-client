import { useState, useCallback } from "react";
import { MdEdit } from "react-icons/md";
import gravatar from "gravatar";
import { useDeleteUser } from "hooks/service/mutator";
import userState from "store/userState";
import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import Textarea from "components/common/Textarea";
import SubMenu from "components/common/SubMenu";
import useUpdateUser from "hooks/service/mutator/user/useUpdateUser";
import alertHandler, { alertMessage } from "utils/functions/alertHandler";
import { uploadImage } from "utils/apis/image";
import { Title } from "components/domain/My/styles";
import {
  ButtonGroup,
  ProfileBlock,
  ProfileContainer,
  UserInfo
} from "./styles";

const UserProfile = () => {
  // const userInfo = useRecoilValue(userState);
  const { userInfo } = userState();
  const deleteMutate = useDeleteUser();
  const updateMutate = useUpdateUser();

  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [aboutMe, setAboutMe] = useState(userInfo?.aboutMe);
  const [showProfileSubMenu, setShowProfileSubMenu] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>("");

  const onShowProfileSubMenu = useCallback(() => {
    setShowProfileSubMenu((prev) => !prev);
  }, []);

  const onCloseMenu = useCallback(() => {
    setShowProfileSubMenu(false);
  }, []);

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    e.target.focus();
  };
  const onChangeAboutMe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMe(e.target.value);
  };
  const onToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    if (nickname || aboutMe) {
      setNickname("");
      setAboutMe("");
    }
  };

  const onDelUser = useCallback(() => {
    alertHandler
      .onConfirm({
        icon: "warning",
        html: (
          <p style={{ fontSize: 16 }}>
            회원 탈퇴하면 모든 데이터가 삭제됩니다.
            <br />
            그래도 회원 탈퇴를 하시겠습니까?
          </p>
        )
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMutate.mutate(userInfo?._id as string);
        } else if (result.isDismissed) {
          alertHandler.onToast({ msg: alertMessage.cancelMsg });
        }
      });
  }, [deleteMutate, userInfo?._id]);

  const onChangeImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      // TODO: 이미지 업로드 로직 추가하기.
      const formData = new FormData();
      const file = (e.currentTarget.files as FileList)[0];
      formData.append("profileImg", file);
      const { data } = await uploadImage(formData);

      setThumbnail(data.imgPath);
      setIsEditMode(true);
      setShowProfileSubMenu(false);
    },
    []
  );

  const onDeleteImg = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: 이미지 삭제 로직 추가하기.
    console.log(e.target);
  }, []);

  const onUpdateUser = useCallback(() => {
    if (nickname || aboutMe || thumbnail) {
      console.log({ thumbnail });
      const insertData = {
        nickname: nickname || (userInfo?.nickname as string),
        aboutMe: aboutMe || (userInfo?.aboutMe as string),
        imageSrc: thumbnail || (userInfo?.imageSrc as string)
      };
      console.log(insertData);
      console.log(thumbnail);
      updateMutate.mutate({
        userId: userInfo?._id as string,
        userData: insertData
      });
    }
    setIsEditMode((prev) => !prev);
  }, [
    aboutMe,
    nickname,
    thumbnail,
    updateMutate,
    userInfo?._id,
    userInfo?.aboutMe,
    userInfo?.imageSrc,
    userInfo?.nickname
  ]);

  return (
    <div>
      <Title>프로필</Title>
      <ProfileBlock>
        <ProfileContainer>
          <div className="profile-img">
            <button
              className="prof_btn"
              onClick={onShowProfileSubMenu}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <MdEdit color="#232" />
            </button>
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
                userInfo?.imageSrc
                  ? `http://localhost:5000/${
                      thumbnail ? thumbnail : userInfo?.imageSrc
                    }`
                  : thumbnail
                  ? `http://localhost:5000/${thumbnail}`
                  : gravatar.url(userInfo?.email as string, {
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
                    label: <label htmlFor="image">이미지 수정</label>
                  },
                  {
                    id: 2,
                    path: null,
                    label: "이미지 삭제",
                    handler: () => console.log("이미지 삭제")
                  }
                ]}
                showSubMenu={showProfileSubMenu}
                onCloseMenu={onCloseMenu}
                customCss={{
                  posX: "0px",
                  posY: "135px"
                }}
              />
            )}
          </div>
          <UserInfo>
            <div className="Info_block">
              <div className="info_title">닉네임</div>
              {isEditMode ? (
                <input
                  className="info_cont edit_mode"
                  placeholder={userInfo?.nickname}
                  value={nickname}
                  onChange={onChangeNickName}
                />
              ) : (
                <div className="info_cont">{userInfo?.nickname}</div>
              )}
            </div>
            <div className="Info_block">
              <div className="info_title">소개</div>
              {isEditMode ? (
                <Textarea
                  rows={11}
                  className="info_cont about_me edit_mode"
                  placeholder={userInfo?.aboutMe}
                  defaultValue={aboutMe}
                  onChange={onChangeAboutMe}
                />
              ) : (
                <div className="info_cont about_me">{userInfo?.aboutMe}</div>
              )}
            </div>
          </UserInfo>
          <ButtonGroup>
            {isEditMode ? (
              <Button text="프로필 적용" onClick={onUpdateUser} />
            ) : (
              <Button text="프로필 수정" onClick={onToggleEditMode} />
            )}
            <Button text="회원 탈퇴" onClick={onDelUser} />
          </ButtonGroup>
        </ProfileContainer>
      </ProfileBlock>
    </div>
  );
};

export default UserProfile;
