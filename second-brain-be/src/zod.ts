import z from "zod";

export const safeSignUpSchema = z.object({
        email: z.email("Please enter a valid email address"),
        username: z.string()
        .min(3, "Username must be of at least 3 characters")
        .max(20, "Username must be under 20 characters"),
        password: z.string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
   })

export const safeSignInSchema = z.object({
        email: z.email("Please enter a valid email address"),
        password: z.string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number") 
    })