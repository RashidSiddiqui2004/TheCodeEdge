import dbConnect from "@/lib/dbConnect";
import axios from "axios";
import crypto from "crypto";

export async function GET(request: Request) {
    // store the data in database to save API calls
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

        // Current UNIX time in seconds
        const currentTime = Math.floor(Date.now() / 1000);

        const apiKey = process.env.CODEFORCES_API_KEY;
        const secret = process.env.CODEFORCES_API_SECRET;

        if (!apiKey || !secret) {
            throw new Error("API key or secret is missing from environment variables.");
        }

        // Random string for the first 6 characters of apiSig
        const rand = Math.random().toString(36).substring(2, 8);

        // API method name
        const methodName = "contest.standings";

        // Query parameters 
        const params = `apiKey=${apiKey}&asManager=false&contestId=${contestID}&count=1&from=1&time=${currentTime}`;

        // Construct the string to hash
        const stringToHash = `${rand}/${methodName}?${params}#${secret}`;

        // Generate SHA-512 hash
        const hash = crypto.createHash("sha512").update(stringToHash).digest("hex");

        // Construct the full apiSig
        const apiSig = `${rand}${hash}`;

        // Add apiSig to the query string
        const queryString = `${params}&apiSig=${apiSig}`;

        // Construct the final API URL
        const apiUrl = `https://codeforces.com/api/${methodName}?${queryString}`;

        const response = await axios.get(apiUrl);

        const contestData = response.data.result;

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
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch contest data.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
