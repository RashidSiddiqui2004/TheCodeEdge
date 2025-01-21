import axios from "axios";

export async function GET() {
    try {

        const response = await axios.get("https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all");
        const contestData = response.data.past_contests;

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

        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch latest contests data. Please try again later.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
