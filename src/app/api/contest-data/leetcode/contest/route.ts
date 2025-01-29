import dbConnect from "@/lib/dbConnect";
import axios from "axios";

// to get details of a particular leetcode contest
export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const contestID = searchParams.get("contestID");

        if (!contestID) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'contestID' parameter." }),
                { status: 400 }
            );
        }

        const apiUrl = `https://leetcode.com/contest/api/info/${contestID}`;

        const response = await axios.get(apiUrl);

        const contestData = response.data;

        if (contestData) {
            return new Response(
                JSON.stringify({
                    success: true,
                    contestData,
                    message: "Latest contests data fetched successfully.",
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                success: false,
                message: "No contest data available.",
            }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching contest data:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch contest data.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
