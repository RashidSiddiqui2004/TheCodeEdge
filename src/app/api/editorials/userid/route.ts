
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// To fetch all editorials for a user using their unique ObjectId
export async function GET(request: Request) {
    try {
        await dbConnect(); 

        const { searchParams } = new URL(request.url);
        const userid = searchParams.get("objectId");

        if (!userid) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'objectId' parameter." }),
                { status: 400 }
            );
        }

        // Fetch user by their unique ObjectId
        const userData = await UserModel.findById(userid).populate("editorials");

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
                message: "User editorials fetched successfully by ObjectId.",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching editorials by ObjectId:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500 }
        );
    }
}
