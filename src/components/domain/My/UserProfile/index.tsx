import { Title } from "components/domain/My/styles";
import { ProfileBlock, ProfileContainer } from "./styles";
import UserProfileInfo from "./components/UserProfileInfo";
import UserProfileImage from "./components/UserProfileImage";

const UserProfile = () => {
  return (
    <div>
      <Title>프로필</Title>
      <ProfileBlock>
        <ProfileContainer>
          <UserProfileImage />
          <UserProfileInfo />
        </ProfileContainer>
      </ProfileBlock>
    </div>
  );
};

export default UserProfile;
