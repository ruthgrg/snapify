import { useUserContext } from "@/context/AuthContext";

import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const userCtx = useUserContext();

  return (
    <div className="flex w-full">
      {userCtx.isAuthenticated ? (
        <Navigate to={"/home"} />
      ) : (
        <div className="flex flex-1 w-full ">
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="h-screen w-1/2  object-cover bg-no-repeat  max-xl:hidden "
          />
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
