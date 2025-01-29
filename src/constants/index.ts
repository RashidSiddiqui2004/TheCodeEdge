import { ContestPlatforms } from "@/enums/ContestPlatforms";

export const APP_NAME = "TheCodeEdge";
export const CURRENCY_NAME = "AlgoGems";
export const EDITORIAL_LIMITS = {
    "MAX_TITLE": 200,
    "MAX_INTRO": 5000,
    "MAX_OUTRO": 2000
};

export const REWARDS = {
    "WRITE_EDITORIAL_POINTS": 10,
    "UPVOTE_ON_EDITORIAL_POINTS": 2,
    "COMMMENT_ON_EDITORIAL_POINTS": 3,
}

export const contestProblemLinks = {
    [ContestPlatforms.CodeChef]: "codechef.com",
    [ContestPlatforms.Codeforces]: "codeforces.com",
    // [ContestPlatforms.LeetCode]: "leetcode.com/problems/",
    // [ContestPlatforms.HackerRank]: "hackerrank/problems",
}