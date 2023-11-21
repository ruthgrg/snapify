import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const userCtx = useUserContext();
  return (
    <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm align-middle">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              loading="lazy"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%]">
              {post.creator.name}
            </p>
            <div className="flex justify-start items-center gap-2 text-light-3">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-semibold lg:leading-[140%]">
                {multiFormatDateString(post.$createdAt)}
              </p>
            </div>
            <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-semibold lg:leading-[140%]">
              - {post.location}
            </p>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${post.creator.$id !== userCtx.user.id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="text-[12px] font-medium leading-[140%] lg:text-[16px] py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post Image"
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
          crossOrigin="use-credentials"
        />
      </Link>
      <PostStats post={post} userId={userCtx.user.id} />
    </div>
  );
};

export default PostCard;
