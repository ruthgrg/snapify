import { useUserContext } from "@/context/AuthContext";

import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const userCtx = useUserContext();

  return (
    <div className="flex w-full  overflow-scroll custom-scrollbar">
      {userCtx.isAuthenticated ? (
        <Navigate to={"/home"} />
      ) : (
        <div className="flex flex-1 w-full max-xl:flex-col-reverse max-xl:p-10 max-xl:items-center">
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="h-screen w-1/2  object-cover bg-no-repeat min-w-[250px] min-h-[600px] max-sm:h-auto max-md:pt-[150px] "
          />
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
