import UserProfileImage from "./components/UserProfileImage";
import UserProfileInfo from "./components/UserProfileInfo";
import { MyWarp, ProfileWarp, ProfileContext, ProfileHeader } from "./styles";

const My = () => {
  return (
    <MyWarp>
      <ProfileWarp>
        <ProfileHeader>
          <h1 className="title">프로필</h1>
        </ProfileHeader>
        <ProfileContext>
          <UserProfileImage />
          <UserProfileInfo />
        </ProfileContext>
      </ProfileWarp>
    </MyWarp>
  );
};

export default My;
