import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5x flex justify-start gap-3 w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bol text-left w-full">Create Post</h2>
        </div>
        <PostForm post={undefined} />
      </div>
    </div>
  );
};

export default CreatePost;
