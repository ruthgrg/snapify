import { Models } from "appwrite";
import { Button } from "../button";

type UserCardProp = {
  user: Models.Document;
};

const userCard = ({ user }: UserCardProp) => {
  console.log(user);
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <img
        src={user.imageUrl}
        alt="user Image"
        width={36}
        height={36}
        className="rounded-full flex justify-center items-center"
      />
      <div className="flex flex-col text-center items-center gap-2">
        <h2 className="text-[14px] md:text-[16px] text-light-1 font-medium leading-[140%]">
          {user.name}
        </h2>
        <h3 className="text-[12px] md:text-[14px] text-light-3 font-medium leading-[140%]">
          @{user.username}
        </h3>
      </div>
      <Button variant="ghost" className="shad-button_primary">
        follow
      </Button>
    </div>
  );
};

export default userCard;
