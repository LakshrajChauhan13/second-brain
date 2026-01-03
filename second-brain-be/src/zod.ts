import { z } from "zod";

export const safeSignUpSchema = z.object({
        email: z.email("Please enter a valid email address").toLowerCase(),
        username: z.string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be under 20 characters"),
        password: z.string()
            .min(8, "Password must be atleast 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
   })

export const safeSignInSchema = z.object({
        email: z.email("Please enter a valid email address").toLowerCase(),
        password: z.string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number") 
    })

export const safeCreateContentSchema = z.object({
    title: z.string().min(3, "Title can't be lower than 3 characters").max(20, "Title can't exceed 20 letters"),
    link: z.url("enter a valid Url"),
    type: z.enum(["Video", "Tweet", "Linkedin", "Document"], "Choose a type from - Video, Tweet, Linkedin, Document")
})



