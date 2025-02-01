import { Sponsor } from "@/components/custom/Sponsors";
import dbConnect from "@/lib/dbConnect";
import CompanyModel, { Company } from "@/model/Company";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        // Fetch latest 3 sponsors sorted by createdAt in descending order
        const latestSponsors = await CompanyModel.find({})
            .sort({ createdAt: -1 })
            .limit(3);

        console.log(latestSponsors);

        if (!latestSponsors.length) {
            return NextResponse.json(
                { success: false, message: "No sponsors found." },
                { status: 200 }
            );
        }

        const latestSponsorsData: Sponsor[] = latestSponsors.map((company: Company) => ({
            sponsorName: company.companyName,
            sponsorUrl: company.companyLogo
        }));

        return NextResponse.json(
            { success: true, message: "Fetched latest sponsors successfully.", sponsors: latestSponsorsData },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch latest sponsors." },
            { status: 500 }
        );
    }
}
