import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import EditorialModel from "@/model/Editorial";
import { NextResponse } from "next/server";
import { REWARDS } from "@/constants";

// To create an editorial
export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            clerkUserId,
            title,
            contestPlatform,
            contestName,
            languageUsed,
            overallDifficulty,
            introduction,
            outro,
            problems,
            tags
        } = await request.json();

        const user = await UserModel.findOne({ clerkUserId });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 }
            );
        }

        const editorial = new EditorialModel({
            author: user._id, // author's id
            title,
            contestPlatform,
            contestName,
            languageUsed,
            overallDifficulty,
            problems,
            introduction,
            outro,
            tags,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedEditorial = await editorial.save();

        user.editorials.push(savedEditorial._id);
        user.algoPoints += REWARDS.WRITE_EDITORIAL_POINTS; // increment algopoints for the author

        await user.save();

        return NextResponse.json(
            { success: true, message: "Editorial published successfully.", editorialId: savedEditorial._id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error publishing editorial:", error);
        return NextResponse.json(
            { success: false, message: "Error publishing editorial." },
            { status: 500 }
        );
    }
}

// To fetch all editorials for a user using their `clerkUserId`
export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'userId' parameter." }),
                { status: 400 }
            );
        }

        const userData = await UserModel.findOne({ clerkUserId: userId }).populate("editorials");

        if (!userData) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found." }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                userEditorials: userData.editorials,
                message: "User editorials fetched successfully.",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user editorials:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500 }
        );
    }
}
