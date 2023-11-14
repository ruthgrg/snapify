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
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "../ui/shared/FileUploader";
import { postValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import {
  useQueryCreatePostMutation,
  useQueryToUpdatePostMutation,
} from "@/lib/react-query/queriesAndMutation";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// This is the post we get from appwrite db when updating
type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const userCtx = useUserContext();
  const { mutateAsync: createPost, ispending: createPostPending } =
    useQueryCreatePostMutation();
  const { mutateAsync: updatePost, isPending: updatePostPending } =
    useQueryToUpdatePostMutation();

  const { toast } = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof postValidation>) {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        return toast({ title: "Please try again" });
      }
      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...values,
      userId: userCtx.user.id,
    });

    if (!newPost) {
      return toast({ title: "Please try again" });
    }

    return navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your caption"
                  {...field}
                  className="h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Add your location"
                  className="h-12 bg-dark-3 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Add Tags (separated by comma ',')
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Art, Expression, Learn"
                  className="h-12 bg-dark-3 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
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
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createPostPending || updatePostPending}
            className="bg-primary-500 hover:bg-primary-600 text-light-1 flex gap-2 whitespace-nowrap"
          >
            {createPostPending || (updatePostPending && "Loading...")}
            {action === "Create" && "Create"}
            {action === "Update" && "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
