import { useEffect, useState } from "react";
import {
  useQueryGetCurrentUser,
  useQueryToDeleteSavedPostMutation,
  useQueryToLikePostMutation,
  useQueryToSavedPostMutation,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Loader } from "lucide-react";

type PoststatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PoststatsProps) => {
  const { data: currentUser } = useQueryGetCurrentUser();

  const { mutate: likePost, isPending: likeLoading } =
    useQueryToLikePostMutation();

  const { mutate: savedPost, isPending: saveLoading } =
    useQueryToSavedPostMutation();

  const { mutate: deleteSavedPost } = useQueryToDeleteSavedPostMutation();

  const likedList = post?.likes?.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likedList);
  const [isSaved, setIsSaved] = useState(false);

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((id: string) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postID: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }
    savedPost({ postID: post?.$id || "", userID: userId });
    setIsSaved(true);
  };

  const doesUserLiked = likes.includes(userId);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {likeLoading ? (
          <Loader />
        ) : (
          <img
            src={
              doesUserLiked
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }
            alt="like"
            width={20}
            height={20}
            onClick={handleLikePost}
            className="cursor-pointer"
          />
        )}

        <p className="text-[12px] font-medium leading-[140%] lg:text-[16px]">
          {likes.length}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {saveLoading ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
