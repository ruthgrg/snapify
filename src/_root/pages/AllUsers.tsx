import Loader from "@/components/ui/shared/Loader";
import UserCard from "@/components/ui/shared/userCard";
import { useQueryGetAllUsers } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";

const AllUsers = () => {
  const { data: allUsers, isLoading: isUserLoading } = useQueryGetAllUsers();

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] h-[100vh]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full p-10  overflow-scroll custom-scrollbar ">
      <div className="flex items-center w-full gap-5 py-5">
        <img
          src="/assets/icons/people-copy.svg"
          alt="allUsers"
          width={36}
          height={36}
        />
        <h1 className="h3-bold md:h2-bol text-left w-full">All Users</h1>
      </div>
      <ul className="w-full h-full grid justify-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5  py-4">
        {allUsers &&
          allUsers.documents.map((user: Models.Document) => (
            <li
              key={user.$id}
              className="group relative  w-[280px] h-[280px] lg:w-[300px] lg:h-[300px] bg-dark-4 flex justify-center items-center rounded-[8px]"
            >
              <UserCard user={user} />
              <span className="hidden lg:top-[250px] top-[235px] group-hover:unimplemented-feature_info">
                Not yet implemented
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllUsers;
