import ProfileForm from "@/components/forms/ProfileForm";

import { useQueryGetCurrentUser } from "@/lib/react-query/queriesAndMutation";

const UpdateProfile = () => {
  const { data: currentUser } = useQueryGetCurrentUser();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5x flex justify-start gap-3 w-full">
          <img
            src="/assets/icons/edit-copy.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bol text-left w-full">Edit profile</h2>
        </div>
        <ProfileForm user={currentUser} />
      </div>
    </div>
  );
};

export default UpdateProfile;
