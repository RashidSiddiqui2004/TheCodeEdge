import dbConnect from "@/lib/dbConnect";
import EditorialModel from "@/model/Editorial";

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const platform = searchParams.get("platform");

        if (!platform) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'platform' parameter." }),
                { status: 400 }
            );
        }

        const editorials = await EditorialModel.find({ contestPlatform: platform }).exec();

        return new Response(
            JSON.stringify({
                success: true,
                editorials,
                message: `Fetched editorials for platform '${platform}' successfully.`
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching editorials by platform:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500 }
        );
    }
}
