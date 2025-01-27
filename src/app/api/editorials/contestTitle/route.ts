import dbConnect from "@/lib/dbConnect";
import EditorialModel from "@/model/Editorial";

// fetch editorial for a given contest by title

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const title = searchParams.get("contestTitle");

        if (!title) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'title' parameter." }),
                { status: 400 }
            );
        }

        const editorials = await EditorialModel.find({
            contestTitle: { $regex: title, $options: "i" } // Case-insensitive search
        }).exec();

        return new Response(
            JSON.stringify({
                success: true,
                editorials,
                message: `Fetched editorials for contest title '${title}' successfully.`
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching editorials by contest title:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500 }
        );
    }
}
