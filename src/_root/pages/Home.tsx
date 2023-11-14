import Loader from "@/components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import { useUserContext } from "@/context/AuthContext";
import { useQueryToGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userCtx = useUserContext();

  useEffect(() => {
    if (!userCtx.isAuthenticated) return navigate("/");
  }, [navigate, userCtx.isAuthenticated]);

  const { data: posts, isPending: isPostsLoading } = useQueryToGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar ">
        <div className=" max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">
            Home Feed
          </h2>
          {isPostsLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
