import Loader from "@/components/ui/shared/Loader";
import { useQueryToGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import { useQuery } from "@tanstack/react-query";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostsLoading,
    isError: isPostsError,
  } = useQueryToGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar ">
        <div className="bg-red max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">
            Feed
          </h2>
          {isPostsLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li>{post.caption}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
