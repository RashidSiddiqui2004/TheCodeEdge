import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import EditorialModel from "@/model/Editorial";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { clerkUserId, title, contestPlatform, languageUsed, overallDifficulty } = await request.json();

        const user = await UserModel.findOne({ clerkUserId });

        if (user) {
            const editorial = new EditorialModel({
                author: user._id,
                title,
                contestPlatform,
                languageUsed,
                overallDifficulty,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Save the new editorial to the database
            await editorial.save();

            user.editorials.push(editorial._id);
            await user.save();

            return new Response(
                JSON.stringify({ success: true, message: "Editorial published successfully." }),
                { status: 200 }
            );
        } else {
            // If user not found, respond with an error
            return new Response(
                JSON.stringify({ success: false, message: "User not found." }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error publishing editorial:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Error publishing editorial." }),
            { status: 500 }
        );
    }
}
