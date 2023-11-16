import Bottombar from "@/components/ui/shared/Bottombar";
import LeftSidebar from "@/components/ui/shared/LeftSidebar";
import Topbar from "@/components/ui/shared/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userCtx.isAuthenticated) {
      setIsLoading(false);
      return navigate("/sign-in");
    } else {
      setIsLoading(false);
      navigate("/home");
    }
  }, [navigate, userCtx.isAuthenticated]);

  if (isLoading) {
    return <div className="overflow-hidden"></div>;
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
