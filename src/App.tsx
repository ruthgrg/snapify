import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import {
  AllUsers,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import CreatePost from "./_root/pages/CreatePost";
import Entry from "./_auth/forms/Entry";
import { useUserContext } from "./context/AuthContext";
import { Loader } from "lucide-react";

const App = () => {
  const userCtx = useUserContext();
  if (userCtx.isLoading) {
    return (
      <div className="flex justify-center items-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Entry />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/all-users" element={<AllUsers />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
