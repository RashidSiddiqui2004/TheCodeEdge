import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import EditorialModel from "@/model/Editorial";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { clerkUserId, title, contestPlatform, contestName, languageUsed,
            overallDifficulty, introduction, outro, problems
        } = await request.json()

        const user = await UserModel.findOne({ clerkUserId })

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
        }

        const editorial = new EditorialModel({
            author: user._id,
            title,
            contestPlatform,
            contestName,
            languageUsed,
            overallDifficulty,
            problems,
            introduction,
            outro,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const savedEditorial = await editorial.save();

        user.editorials.push(savedEditorial._id)
        await user.save()

        return NextResponse.json(
            { success: true, message: "Editorial published successfully.", editorialId: savedEditorial._id },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error publishing editorial:", error)
        return NextResponse.json(
            { success: false, message: "Error publishing editorial." },
            { status: 500 },
        )
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing 'userId' parameter." }),
                { status: 400 }
            );
        }
         
        // Fetch user and populate editorials using Mongoose's `populate` method
        const userData = await UserModel.findOne({ clerkUserId: userId }).populate("editorials");

        if (!userData) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found." }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                userEditorials: userData.editorials,
                message: "User editorials fetched successfully."
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user editorials:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error." }),
            { status: 500 }
        );
    }
}
 
// BAD CODE => Learn new methods which are more efficient -> populate method
// export async function GET(request: Request) {

//     try {
//         await dbConnect();

//         const { searchParams } = new URL(request.url);
//         const userId = searchParams.get("userId");

//         if (!userId) {
//             return new Response(
//                 JSON.stringify({ success: false, message: "Missing 'userId' parameter." }),
//                 { status: 400 }
//             );
//         }

//         const userData = await UserModel.findOne({ clerkUserId: userId });

//         if (userData) {
//             console.log(userData);

//             const editorialIds = userData.editorials;

//             console.log(editorialIds);

//             const editorials: Editorial[] = [];

//             for (const editorialId of editorialIds) {
//                 const currentEditorial = await EditorialModel.findById(editorialId);
//                 if (currentEditorial)
//                     editorials.push(currentEditorial);
//             }

//             return new Response(
//                 JSON.stringify({
//                     success: true,
//                     usereditorials: editorials,
//                     message: "Missing 'userId' parameter."
//                 }),
//                 { status: 200 }
//             );
//         }

//         return new Response(
//             JSON.stringify({
//                 success: false,
//                 message: "User not found."
//             }),
//             { status: 404 }
//         );

//     } catch (error) {
//         return new Response(
//             JSON.stringify({
//                 success: false,
//                 message: "Internal server error."
//             }),
//             { status: 500 }
//         );
//     }
// }