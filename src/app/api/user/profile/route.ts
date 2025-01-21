import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { clerkUserId, username, email, bio, socialLinks } = await request.json()

        const existingUser = await UserModel.findOne({ clerkUserId: clerkUserId })

        if (existingUser) {
            existingUser.username = username
            existingUser.email = email
            existingUser.bio = bio
            existingUser.socialLinks = socialLinks
            await existingUser.save()
        } else {
            await UserModel.create({ username, email, clerkUserId, bio, socialLinks })
        }

        return new Response(JSON.stringify({ success: true, message: "User updated successfully." }), { status: 200 })
    } catch (error) {
        console.error("Error updating user profile:", error)
        return new Response(JSON.stringify({ success: false, message: "Error updating profile" }), { status: 500 })
    }
}

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const clerkUserId = searchParams.get("clerkUserId");

        if (!clerkUserId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'clerkUserId' parameter." }),
                { status: 400 }
            );
        }

        const userFromDB = await UserModel.findOne({ clerkUserId });

        if (userFromDB) {
            return new Response(
                JSON.stringify({
                    success: true,
                    user: userFromDB,
                    message: "User retrieved successfully.",
                }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ success: false, message: "error." }),
            { status: 400 }
        );
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Error retrieving the user profile." }),
            { status: 500 }
        );
    }
}
