import dbConnect from "@/lib/dbConnect";
import axios from "axios";

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

        const apiURL = process.env.CODECHEF_CONTEST_DATA_API_URL;

        if (!apiURL) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Codechef API_2 not provided for fetching specific contest data.",
                }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const response = await axios.get(`${apiURL}/${contestID + 'B'}`);
        const contestData = response.data;

        if (contestData) {
            return new Response(
                JSON.stringify({
                    success: true,
                    contestData,
                    message: "Latest contest data fetched successfully.",
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

        console.log(error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch contest data.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
