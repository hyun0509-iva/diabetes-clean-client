import { Title } from "components/domain/My/styles";
import UserProfileInfo from "./components/UserProfileInfo";
import UserProfileImage from "./components/UserProfileImage";
import { ProfileBlock, ProfileContainer } from "components/domain/My/styles";

const UserProfile = () => {
  return (
    <ProfileBlock>
      <ProfileContainer>
        <Title>프로필</Title>
        <UserProfileImage />
        <UserProfileInfo />
      </ProfileContainer>
    </ProfileBlock>
  );
};

export default UserProfile;
