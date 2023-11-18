import Loader from "@/components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import { useQueryToGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Suspense } from "react";

const Home = () => {
  const { data: posts, isLoading: arePostsLoading } =
    useQueryToGetRecentPosts();

  if (arePostsLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full">
          <Loader />
        </div>
      }
    >
      <div className="flex flex-1">
        <div className="flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar ">
          <div className=" max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
            <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">
              Home Feed
            </h2>
            {
              <ul className="flex flex-col gap-9 w-full">
                {posts?.documents.map((post: Models.Document) => (
                  <PostCard key={post.$id} post={post} />
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
