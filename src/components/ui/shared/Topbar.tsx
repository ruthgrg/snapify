import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useSignOutMutation } from "@/lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutMutation();
  const navigate = useNavigate();
  const userCtx = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <section className="topbar overflow-hidden">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex-between py-4 px-5">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link
            to={`/profile/${userCtx.user.id}`}
            className="flex-center gap-3"
          >
            <img
              src={userCtx.user.imageUrl || "/assets/images/profile.png"}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
