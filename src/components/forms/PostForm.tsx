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

const formSchema = z.object({
  caption: z.string().min(2, {
    message: "Caption must be at least 2 characters.",
  }),
  file: z.string().min(1, {
    message: "Atleast one file must be added",
  }),
  location: z
    .string()
    .max(10, { message: "Location must small than 10 characters" }),
  tags: z.string(),
});

const PostForm = ({ post }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      file: "",
      location: "",
      tags: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            className="bg-primary-500 hover:bg-primary-600 text-light-1 flex gap-2 whitespace-nowrap"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
