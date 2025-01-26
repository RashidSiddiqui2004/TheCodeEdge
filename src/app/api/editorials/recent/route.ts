import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

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

        const userData = await UserModel.findById(userId).populate("editorials");

        if (!userData) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found." }),
                { status: 404 }
            );
        }

        const totalEditorials = userData.editorials.length;

        const latest5Editorials = userData.editorials.slice(Math.max(0, totalEditorials - 5), totalEditorials) || [];

        return new Response(
            JSON.stringify({
                success: true,
                recentEditorials: latest5Editorials,
                message: "Recent user editorials fetched successfully."
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
