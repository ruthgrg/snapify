import { Input } from "@/components/ui/input";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import SearchResults from "@/components/ui/shared/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import {
  useQueryGetInfinitePosts,
  useQueryGetSeachedPosts,
} from "@/lib/react-query/queriesAndMutation";
import { useState } from "react";

const Explore = () => {
  const {
    data: posts,
    fecthNextPage,
    hasNextPage,
  } = useQueryGetInfinitePosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: SearchPosts, isFetching: isSearchFetching } =
    useQueryGetSeachedPosts(debouncedValue);

  if (!posts) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item.documents.length === 0);

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max:w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="h3-bold md:h2-bold w-full">Seacrh Posts</h2>
        <div className="flex gap-3 px-4 w-full rounded-lg bh-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="seacrh"
            width={24}
            height={24}
          ></img>
          <Input
            type="text"
            placeholder="Search"
            className="explore-search max-w-lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w:5xl mt-16 mb-7">
        <h3 className="h3-bold md:h3-bold w-full">Popular Today</h3>
        <div className="bg-dark-3 flex justify-center items-center gap-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-[12px] font-medium leading-[140%]">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="bg-dark-4 flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowPosts ? (
          <SearchResults />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">
            End of the Posts
          </p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`pages-${index}`} posts={item.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
