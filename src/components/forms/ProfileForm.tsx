import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileValidation } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import FileUploader from "../ui/shared/FileUploader";
import { useQueryToUpdateProfileMutation } from "@/lib/react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "@/context/AuthContext";

const ProfileForm = () => {
  const userCtx = useUserContext();
  const user = userCtx.user;

  const { mutateAsync: updateProfile, isPending } =
    useQueryToUpdateProfileMutation();

  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileValidation>>({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileValidation>) {
    const updateProfileObject = {
      file: values.file,
      name: values.name.trim(),
      username: values.username.trim(),
      email: values.email.trim(),
      bio: values.bio.trim(),
    };

    const updatedProfile = await updateProfile({
      ...updateProfileObject,
      userId: user.id,
      imageId: user.imageId,
      imageUrl: user.imageUrl,
    });

    if (!updatedProfile) return toast("Please try again");
    userCtx.setUser({
      id: updatedProfile.$id,
      name: updatedProfile.name,
      username: updatedProfile.username,
      email: updatedProfile.email,
      imageUrl: updatedProfile.imageUrl,
      imageId: updatedProfile.imageId,
      bio: updatedProfile.bio,
    });

    return navigate(`/profile/${user.id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl "
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex items-center max-sm:flex-col">
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={user?.imageUrl}
                />
              </FormControl>
              <FormLabel className="text-primary-500">
                Change your profile pic
              </FormLabel>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Name"
                  className="h-12 bg-dark-3 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Username"
                  className="h-12 bg-dark-3 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Email"
                  className="h-12 bg-dark-3 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your bio"
                  {...field}
                  className="h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="h-12 bg-dark-4 text-light-1 flex gap-2 px-5 "
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-light-1 flex gap-2 whitespace-nowrap"
          >
            {isPending && "Loading... "}
            {!isPending && "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;

// Image by sara_guerra on Freepik
