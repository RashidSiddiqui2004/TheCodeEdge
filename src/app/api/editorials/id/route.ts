import dbConnect from "@/lib/dbConnect";
import EditorialModel from "@/model/Editorial";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const editorialId = searchParams.get("editorialId");

        if (!editorialId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'editorialId' parameter." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (!ObjectId.isValid(editorialId)) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid 'editorialId' format." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const editorial = await EditorialModel.findById(editorialId);
  
        if (!editorial) {
            return new Response(
                JSON.stringify({ success: false, message: "Editorial not found." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                editorial,
                message: "Editorial fetched successfully.",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {

        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
