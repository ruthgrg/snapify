import Loader from "./Loader";
import GridPostList from "./GridPostList";
import { Models } from "appwrite";

type SearchedResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchedResultsProps) => {
  if (!searchedPosts || searchedPosts.length === 0) {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found.</p>
    );
  }

  if (isSearchFetching) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return <GridPostList posts={searchedPosts} />;
};

export default SearchResults;
