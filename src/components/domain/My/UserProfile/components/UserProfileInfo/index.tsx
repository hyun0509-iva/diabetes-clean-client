import { useState, useCallback } from "react";
import { ButtonGroup, UserInfo, UserProfileInfoWrap } from "../../styles";
import Button from "components/common/Button";
import Textarea from "components/common/Textarea";
import userState from "store/userState";
import { useDeleteUser, useUpdateUser } from "hooks/service/mutator";
import alertHandler, { alertMessage } from "utils/functions/alertHandler";

const UserProfileInfo = () => {
  const { userInfo: me, setUserInfo } = userState();
  const [nickname, setNickname] = useState(me?.nickname);
  const [aboutMe, setAboutMe] = useState(me?.aboutMe);
  const [isEditMode, setIsEditMode] = useState(false);

  const updateUserMutate = useUpdateUser();
  const deleteUserMutate = useDeleteUser();

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

  const onUpdateUser = useCallback(() => {
    if (nickname || aboutMe) {
      const insertData = {
        nickname: nickname || (me?.nickname as string),
        aboutMe: aboutMe || (me?.aboutMe as string)
      };

      updateUserMutate.mutate(
        {
          userId: me?._id as string,
          userData: insertData
        },
        {
          onSuccess: () => {
            console.log(insertData);
            setUserInfo(insertData);
          }
        }
      );
    }
    setIsEditMode((prev) => !prev);
  }, [nickname, aboutMe, me?.nickname, me?.aboutMe]);

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
          deleteUserMutate.mutate(me?._id as string);
        } else if (result.isDismissed) {
          alertHandler.onToast({ msg: alertMessage.cancelMsg });
        }
      });
  }, [deleteUserMutate, me?._id]);
  return (
    <UserProfileInfoWrap>
      <UserInfo>
        <div className="Info_block">
          <div className="info_title">닉네임</div>
          {isEditMode ? (
            <input
              className="info_cont edit_mode"
              value={nickname || me?.nickname}
              onChange={onChangeNickName}
            />
          ) : (
            <div className="info_cont">{me?.nickname}</div>
          )}
        </div>
        <div className="Info_block">
          <div className="info_title">소개</div>
          {isEditMode ? (
            <Textarea
              rows={11}
              className="info_cont about_me edit_mode"
              defaultValue={aboutMe || me?.aboutMe}
              onChange={onChangeAboutMe}
            />
          ) : (
            <div className="info_cont about_me">{me?.aboutMe}</div>
          )}
        </div>
      </UserInfo>
      <ButtonGroup className="profile_info_btn_group">
        {isEditMode ? (
          <Button text="프로필 적용" onClick={onUpdateUser} />
        ) : (
          <Button text="프로필 수정" onClick={onToggleEditMode} />
        )}
        <Button text="회원 탈퇴" onClick={onDelUser} />
      </ButtonGroup>
    </UserProfileInfoWrap>
  );
};

export default UserProfileInfo;
