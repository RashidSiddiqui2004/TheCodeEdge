import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"

// to fetch the profile of the user using its username (for external users)
export async function GET(request: Request) {
    
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'username' parameter." }),
                { status: 400 }
            );
        }

        const userFromDB = await UserModel.findOne({ username });

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
