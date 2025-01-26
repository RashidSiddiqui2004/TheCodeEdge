import dbConnect from "@/lib/dbConnect";
import EditorialModel from "@/model/Editorial";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { id } = await request.json();  

        if (!id) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'id' parameter." }),
                { status: 400 }
            );
        }

        const editorial = await EditorialModel.findById(id);

        if (!editorial) {
            return new Response(
                JSON.stringify({ success: false, message: "Editorial not found." }),
                { status: 404 }
            );
        }

        // Increment the likes count
        editorial.likes += 1;
        await editorial.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Editorial liked successfully.",
                likes: editorial.likes,
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error liking the editorial:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Error liking the editorial." }),
            { status: 500 }
        );
    }
}
