import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useQueryGetSavedPosts } from "@/lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const userCtx = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userCtx.isAuthenticated) return navigate("/");
  }, [navigate, userCtx.isAuthenticated]);

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
      <div className="flex items-center w-full gap-5 py-5">
        <img
          src="/assets/icons/saved-copy.svg"
          alt="allUsers"
          width={36}
          height={36}
          // className="w-[24px] h-[24px]"
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
