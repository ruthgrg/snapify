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