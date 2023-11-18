import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useQueryGetSavedPosts } from "@/lib/react-query/queriesAndMutation";
const Saved = () => {
  const userCtx = useUserContext();

  const { data: savedPosts, isLoading: arePostsLoading } =
    useQueryGetSavedPosts(userCtx.user.id);

  if (arePostsLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (savedPosts?.documents.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>Looks like there are no saved posts at the moment</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 px-10 overflow-scroll custom-scrollbar">
      <div className="flex items-center w-full gap-5 py-5">
        <img
          src="/assets/icons/saved-copy.svg"
          alt="allUsers"
          width={36}
          height={36}
        />
        <h1 className="h3-bold md:h2-bol text-left w-full">Saved</h1>
      </div>
      {savedPosts && (
        <GridPostList
          posts={savedPosts.documents.map((document) => document.post)}
        />
      )}
    </div>
  );
};

export default Saved;
