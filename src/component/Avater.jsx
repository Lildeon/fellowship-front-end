import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { defaultUserPhoto } from "./poster";

// eslint-disable-next-line react/prop-types
const Avater = ({ src }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>
        <img src={defaultUserPhoto} alt="photo" />
      </AvatarFallback>
    </Avatar>
  );
};

export default Avater;
