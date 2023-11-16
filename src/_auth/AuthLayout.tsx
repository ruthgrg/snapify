import { useUserContext } from "@/context/AuthContext";
import SEO from "@/SEO";
import { useEffect } from "react";
// import { Helmet } from "react-helmet-async";

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
    <>
      <SEO
        title="Social media app"
        description="Snapgram is a dynamic and visually stunning React-powered social media app, offering a seamless blend of captivating photo sharing and engaging community interactions. With a user-friendly interface crafted in React, Snapgram lets you effortlessly capture, customize, and share your moments with friends and followers. Immerse yourself in a vibrant network where creativity knows no bounds. Elevate your social media experience with Snapgram, your personalized visual storytelling platform"
        name="Snapgram"
        type="Social media similar to instagram"
      />
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Social media app</title>
        <meta name="description" />
        <meta aria-description="Snapgram is a dynamic and visually stunning React-powered social media app" />
      </Helmet> */}
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
    </>
  );
};

export default AuthLayout;
