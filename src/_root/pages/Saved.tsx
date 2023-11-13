import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useQueryGetSavedPosts } from "@/lib/react-query/queriesAndMutation";

const Saved = () => {
  const userCtx = useUserContext();
  const { data: savedPosts, isPending } = useQueryGetSavedPosts(
    userCtx.user.id
  );

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 px-10 overflow-scroll custom-scrollbar">
      <div className="flex w-full gap-5 py-5">
        <img
          src="/assets/icons/saved-copy.svg"
          alt="allUsers"
          width={36}
          height={36}
        />
        <h1 className="text-[24px] font-medium leading-[140%]">Saved</h1>
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
