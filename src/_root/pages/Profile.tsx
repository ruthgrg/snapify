import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useQueryGetPostsById } from "@/lib/react-query/queriesAndMutation";

const Profile = () => {
  const userCtx = useUserContext();
  const {
    data: posts,
    isPending,
    isFetching,
  } = useQueryGetPostsById(userCtx.user.id);

  console.log(posts);
  if (isFetching) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full flex-col py-[70px] px-8 overflow-scroll custom-scrollbar">
      <div className="flex items-start gap-5 max-sm:flex-col max-sm:items-center">
        <div>
          <img
            src={userCtx.user.imageUrl}
            alt="profile pic"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div className="max-sm:max-sm-flex">
          <div className="flex items-center ">
            <h1 className="text-[18px] font-bold leading-[140%]">
              {userCtx.user.name}
            </h1>
            <button className="px-3">Edit</button>
          </div>
          <p className="text-[16px] text-light-3 font-medium">
            @{userCtx.user.username}
          </p>
          <div className="flex gap-5 my-4">
            <div className="">
              <h3>{5}</h3>
              <p className="text-primary-500">Posts</p>
            </div>
            <div>
              <h3>{236}</h3>
              <p className="text-primary-500">Followers</p>
            </div>
            <div>
              <h3>{234}</h3>
              <p className="text-primary-500">Following</p>
            </div>
          </div>
          <div className="sm:items-start text-center">
            <p>🌿Capturing the essence of nature through my lens</p>
            <p>
              ✨"In every walk with nature, one recieves far more than he
              seeks." - john Muir
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center w-full max-w:5xl mt-16 mb-7">
          <h3 className="h3-bold md:h3-bold w-full">Posts</h3>
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
        <GridPostList posts={posts?.documents} />
      </div>
    </div>
  );
};

export default Profile;
