import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const userCtx = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userCtx.isAuthenticated) {
      navigate("/home");
    }
  }, [navigate, userCtx.isAuthenticated]);

  return (
    <div className="flex w-full">
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
    </div>
  );
};

export default AuthLayout;
