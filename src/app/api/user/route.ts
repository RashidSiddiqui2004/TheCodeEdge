import { Author } from "@/components/custom/EditorialHeader";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// to get the author details (username and imageurl) using author's ID
export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'userId' parameter." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const userFromDB = await UserModel.findById(userId);


        if (userFromDB) {

            const userData: Author = {
                authorName: userFromDB.username,
                authorImage: userFromDB.imageUrl
            };

            return new Response(
                JSON.stringify({
                    success: true,
                    author: userData,
                    message: "Username retrieved successfully.",
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        // User not found
        return new Response(
            JSON.stringify({ success: false, message: "User not found." }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error retrieving username:", error);

        // Handle server errors
        return new Response(
            JSON.stringify({ success: false, message: "Error retrieving the username." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
