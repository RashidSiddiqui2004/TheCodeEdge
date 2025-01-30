import dbConnect from "@/lib/dbConnect";
import CCContestDataModel, { CCContestData } from "@/model/CCContestData";
import axios from "axios";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const contestID = searchParams.get("contestID");

        if (!contestID) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'contestID' parameter." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // **Check if data exists in database first**
        const responseFromDB = await CCContestDataModel.findOne({ contestId: contestID });

        if (responseFromDB && responseFromDB.problems?.length > 0) {
            return new Response(
                JSON.stringify({
                    success: true,
                    contestData: responseFromDB.problems,
                    message: "Contest data fetched from database.",
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        // **If not in DB, fetch from API**
        const apiURL = process.env.CODECHEF_CONTEST_DATA_API_URL;
        if (!apiURL) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "CodeChef API URL not provided.",
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const response = await axios.get(`${apiURL}/${contestID + 'B'}`);

        const contestData = response.data.problems;

        if (!contestData || contestData.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "No contest data found from API.",
                }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // **Store the contest data in the database**
        const contestToSave = new CCContestDataModel({
            contestId: contestID,
            problems: Object.values(contestData).map((problem: any) => ({
                name: problem.name,
                problem_url: problem.problem_url,
            })),
        });

        await contestToSave.save();

        return new Response(
            JSON.stringify({
                success: true,
                contestData,
                message: "Contest data fetched from API and stored in database.",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
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
