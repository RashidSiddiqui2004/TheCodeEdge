import dbConnect from "@/lib/dbConnect";
import EditorialModel from "@/model/Editorial";

export async function GET() {
    try {
        await dbConnect();

        const editorials = await EditorialModel.find({})
            .sort({ createdAt: -1 })
            .limit(20)
            .exec();

        return new Response(
            JSON.stringify({
                success: true,
                editorials,
                message: "Fetched the latest 20 editorials successfully."
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching editorials:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500 }
        );
    }
}
