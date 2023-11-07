import * as z from "zod";


export const signupValidationSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 character' }),
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters" })
        .max(15, { message: "Maximum length for username is 12" }),
    email: z.string().includes('@'),
    password: z.string().min(6, { message: 'Password must be at least 6 character' }),
});


export const signinValidationSchema = z.object({
    email: z.string().includes('@'),
    password: z.string().min(6, {
        message: 'Password must be at least 6'
    })
});


export const postValidation = z.object({
    caption: z
        .string()
        .min(5, { message: "Minimum 5 characters." })
        .max(2200, { message: "Maximum 2,200 caracters" }),
    file: z.custom<File[]>(),
    location: z
        .string()
        .min(1, { message: "This field is required" })
        .max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
});