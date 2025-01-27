import dbConnect from "@/lib/dbConnect";
import EditorialModel from "@/model/Editorial";
import { User } from "@/model/User";

export async function GET() {
    try {
        await dbConnect();

        // Fetch the latest 20 editorials and populate the author details
        const editorials = await EditorialModel.find({})
            // .populate("author")
            .sort({ createdAt: -1 })
            .limit(20)
            .exec();

        // const editorialAuthorMap = editorials.reduce((map, editorial) => {
        //     if (editorial.author) {
        //         map[editorial._id as string] = editorial.author;
        //     }
        //     return map;
        // }, {} as Record<string, User>);

        return new Response(
            JSON.stringify({
                success: true,
                editorials,
                message: "Fetched the latest 20 editorials successfully.",
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
