import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchedResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchedResultsProps) => {
  if (isSearchFetching) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

export default SearchResults;
