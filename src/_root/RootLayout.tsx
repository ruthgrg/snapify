import Bottombar from "@/components/ui/shared/Bottombar";
import LeftSidebar from "@/components/ui/shared/LeftSidebar";
import Loader from "@/components/ui/shared/Loader";
import Topbar from "@/components/ui/shared/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const userCtx = useUserContext();

  useEffect(() => {
    if (!userCtx.isAuthenticated) {
      return navigate("/sign-in");
    }
  }, [navigate, userCtx.isAuthenticated, userCtx.isLoading]);

  if (userCtx.isLoading) {
    return (
      <div className="flex justify-center items-center w-[100%] h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="md:ml-[270px] pb-[82px] md:pb-0 flex flex-1">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
