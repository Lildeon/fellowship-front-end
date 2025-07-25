import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultUserPhoto } from "./poster";

// eslint-disable-next-line react/prop-types
const UserPhoto = ({ src }) => {
  return (
    <Avatar className="w-35 h-35 rounded-full border-3 border-white">
      <AvatarImage src={src} />
      <AvatarFallback>
        <img src={defaultUserPhoto} alt="photo" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserPhoto;
