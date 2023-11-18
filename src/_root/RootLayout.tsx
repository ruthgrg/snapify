import Bottombar from "@/components/ui/shared/Bottombar";
import LeftSidebar from "@/components/ui/shared/LeftSidebar";
import Loader from "@/components/ui/shared/Loader";
import Topbar from "@/components/ui/shared/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const userCtx = useUserContext();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userCtx.isAuthenticated) {
      // setIsLoading(false);
      return navigate("/sign-in");
    }
  }, [navigate, userCtx.isAuthenticated]);

  if (userCtx.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full md:flex overflow-scroll custom-scrollbar">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
