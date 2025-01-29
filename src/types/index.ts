import { QuestionDifficulty } from "@/enums/QuestionDifficulty";

export interface SocialLinkInterface {
    github?: string;
    linkedin?: string;
    leetcode?: string;
    codechef?: string;
    codeforces?: string;
}

export interface ContestData {
    contestCode: string;
    contestName: string;
}

export interface ProblemData {
    problemName: string;
    problemUrl: string;
}

export interface ProblemInput {
    problemName: string;
    approach: string;
    code?: string;
    difficulty: QuestionDifficulty;
    link?: string;
}