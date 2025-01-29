import axios from "axios";

export async function GET() {
    try {

        const response = await axios.get("https://alfa-leetcode-api.onrender.com/shobhit_yadav/contest/history");
        const contestData = response.data.contestHistory;

        const latestContests = contestData.reverse();

        if (contestData) {
            return new Response(
                JSON.stringify({
                    success: true,
                    contestData: latestContests,
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
        console.log(error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch latest contests data. Please try again later.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
