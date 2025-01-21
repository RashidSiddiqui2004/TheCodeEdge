import { Editorial } from "@/model/Editorial";
import { Types } from "mongoose";

const authorId: Types.ObjectId = new Types.ObjectId("507f191e810c19729de860ea");
const commentId1: Types.ObjectId = new Types.ObjectId("507f191e810c19729de860ea");
const commentId2: Types.ObjectId = new Types.ObjectId("507f191e810c19729de860ea");

const mockEditorial: Editorial = {
    _id: "507f1f77bcf86cd799439011",
    title: "Efficient Graph Traversal Techniques",
    content: "In this editorial, we'll explore advanced graph traversal techniques...",
    author: authorId,
    contestPlatform: "LeetCode",
    languageUsed: "Python",
    overallDifficulty: "Medium",
    problems: [
        {
            title: "Depth-First Search Implementation",
            link: "https://leetcode.com/problems/dfs-implementation",
            difficulty: "Easy"
        },
        {
            title: "Breadth-First Search Optimization",
            link: "https://leetcode.com/problems/bfs-optimization",
            difficulty: "Medium"
        },
        {
            title: "Dijkstra's Algorithm Challenge",
            link: "https://leetcode.com/problems/dijkstra-challenge",
            difficulty: "Hard"
        }
    ],
    tags: ["graphs", "dfs", "bfs", "dijkstra", "algorithms"],
    likes: 42,
    comments: [
        commentId1,
        commentId2
    ],
    isApproved: true,
    approvedBy: authorId,
    createdAt: new Date("2023-06-15T10:00:00Z"),
    updatedAt: new Date("2023-06-16T14:30:00Z")
};

console.log(JSON.stringify(mockEditorial, null, 2));

export default mockEditorial;