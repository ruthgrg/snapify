import PostForm from "@/components/forms/PostForm";
import { useQueryGetPostById } from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/ui/shared/Loader";
import { useParams } from "react-router-dom";

const EditPosts = () => {
  const { id } = useParams();
  const { data: post, isPending } = useQueryGetPostById(id || "");

  if (isPending)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5x flex justify-start gap-3 w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            loading="lazy"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bol text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPosts;
