import axios from "axios";

export async function GET() {
    try {

        const apiURL = process.env.CODECHEF_ALL_CONTESTS_API_URL;

        if (!apiURL) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Codechef API_1 not provided for fetching all contests.",
                }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const response = await axios.get(apiURL);

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
