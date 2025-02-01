import { Contributor } from "@/components/custom/TopContributors";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
  
        // Sort by algoPoints in decreasing order, fetch only top 20 participants
        const topUsers = await UserModel.find().sort({ algoPoints: -1 }).limit(20);

        if (topUsers.length === 0) {
            return NextResponse.json(
                { success: false, message: "No users found." },
                { status: 404 }
            );
        }

        const topContributors: Contributor[] = topUsers.map((user: User) => {
            return {
                username: user.username,
                imageUrl: user.imageUrl,
                algopoints: user.algoPoints,
            }
        });

        return NextResponse.json(
            { success: true, message: "Fetched top users successfully.", topContributors: topContributors },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching top users:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch top users." },
            { status: 500 }
        );
    }
}
