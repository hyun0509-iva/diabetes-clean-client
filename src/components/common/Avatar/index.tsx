import { AvatarStyle } from "./styles";

interface IAatarProps {
  size?: number;
  posX?: number;
  posY?: number;
  imgUrl?: string;
  imgName?: string;
}
const Avatar = ({
  size,
  posX,
  posY,
  imgName = "profile-img",
  imgUrl
}: IAatarProps) => {
  return (
    <AvatarStyle size={size} posX={posX} posY={posY}>
      <img src={imgUrl} alt={imgName} />
    </AvatarStyle>
  );
};

export default Avatar;
