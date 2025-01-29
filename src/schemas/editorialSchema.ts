import { z } from "zod";
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge"
import { EDITORIAL_LIMITS } from "@/constants";

const { ContestPlatforms, ProgrammingLanguages, QuestionDifficulty } = enumsTheCodeEdge

const ProblemSchema = z.object({
    problemName: z.string().min(1, "Problem title is required").trim(),
    approach: z.string().trim().min(10, "Proper question approach is required"),
    difficulty: z.enum([QuestionDifficulty.Easy, QuestionDifficulty.Medium, QuestionDifficulty.Hard, QuestionDifficulty.Expert]),
    link: z.string().url(),
    code: z.string(),
})

export const editorialSchema = z.object({
    title: z
        .string()
        .min(8, "Title must be at least 8 characters long")
        .max(EDITORIAL_LIMITS.MAX_TITLE, "Title cannot exceed 200 characters")
        .trim(),
    introduction: z.string().max(EDITORIAL_LIMITS.MAX_INTRO, "Introduction cannot exceed 5000 characters"),
    clerkUserId: z.string(),
    contestPlatform: z.enum([ContestPlatforms.CodeChef, ContestPlatforms.Codeforces,
    ]),
    contestName: z.string().min(4, "Contest name should be atleast 4 characters long."),
    languageUsed: z.enum([ProgrammingLanguages.C, ProgrammingLanguages.Cpp, ProgrammingLanguages.Java, ProgrammingLanguages.Python,
    ProgrammingLanguages.JavaScript
    ]),
    overallDifficulty: z.enum([QuestionDifficulty.Easy, QuestionDifficulty.Medium, QuestionDifficulty.Hard, QuestionDifficulty.Expert]),
    problems: z.array(ProblemSchema),
    outro: z.string().max(EDITORIAL_LIMITS.MAX_OUTRO, "Outro cannot exceed 1000 characters"),
    tags: z.array(z.string().trim().toLowerCase())
})

export type EditorialSchemaType = z.infer<typeof editorialSchema>

