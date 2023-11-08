import { Models } from "appwrite";

type PoststatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PoststatsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="text-[12px] font-medium leading-[140%] lg:text-[16px]">
          0
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          src="/assets/icons/save.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
