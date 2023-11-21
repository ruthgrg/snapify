import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/shared/Loader";
import PostStats from "@/components/ui/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import {
  useQueryGetPostById,
  useQueryToDeletePostMutation,
} from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const { data: post, isLoading: isPostLoading } = useQueryGetPostById(
    id || ""
  );
  const { mutateAsync: deletePost } = useQueryToDeletePostMutation();

  const handleDeletePost = async () => {
    const deletedPost = await deletePost({
      postId: post?.$id || "",
      imageId: post?.imageId,
    });
    if (deletedPost) return navigate("/home");
  };

  if (isPostLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] max-md:mt-[100px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap 10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="bg-dark-1 w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-dark-4 xl:rounded-1.[24px]">
          <img
            src={post?.imageUrl}
            alt="post"
            loading="lazy"
            className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-dark-1;"
          />
          <div className="bg-dark-2 flex flex-col rounded-b-[30px] gap-5 lg:gap-7 flex-1 items-start p-8 ">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="text-[16px] font-medium leading-[140%]">
                    {post?.creator.name}
                  </p>
                  <div className="flex justify-start items-center gap-2 max-xs:flex-col max-xs:items-start max-xs:gap-0 text-light-3">
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-semibold lg:leading-[140%]">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-semibold lg:leading-[140%]">
                      - {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              {userCtx.user.id === post?.creator.$id && (
                <div className="flex items-center justify-center">
                  <Link to={`/update-post/${post?.id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="edit"
                      loading="lazy"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className=""
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              )}
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-normal">
              <p>{post?.caption}</p>
              <ul className="flex flex-wrap gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
              <div
                className=" 
              w-full"
              >
                <PostStats post={post} userId={userCtx.user.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
