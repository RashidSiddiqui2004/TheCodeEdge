import { z } from "zod";

export const updateProfileSchema = z.object({
    bio: z.string().min(2, "Bio should be at least 2 characters").max(500, "Bio should be at most 500 characters"),
    email: z.string().email({
        message: "Invalid email address",
    }),
    userProfileImage: z.string().url({
        message: "Invalid image URL"
    }).or(z.literal("")).optional() ,
    username: z.string().min(1, "Username cannot be empty").max(50, "Username cannot be more than 50 characters"),
    clerkUserId: z.string(),
    socialLinks: z
        .object({
            github: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
            linkedin: z.string().url("Invalid LinkedIn URL").or(z.literal("")).optional(),
            leetcode: z.string().url("Invalid Leetcode URL").or(z.literal("")).optional(),
            codechef: z.string().url("Invalid codechef URL").or(z.literal("")).optional(),
            codeforces: z.string().url("Invalid codeforces URL").or(z.literal("")).optional(),
        })
        .optional(),
})

