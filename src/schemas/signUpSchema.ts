import { z } from 'zod';

export const usernameValidation = z.string()
    .min(4, "Username must be atleast 4 characters")
    .max(25, "Username must be atmost 25 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special character")

// export const signUpSchema = z.object({
//     username: usernameValidation,
//     email: z.string().email({
//         message:"Invalid email address"
//     }),
//     password: z.string().min(6,"Password must be atleast 6 characters")
// })