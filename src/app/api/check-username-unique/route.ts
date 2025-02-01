import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({
    username: usernameValidation,
    clerkId: z.string().min(1, "clerkId is required") // Ensure clerkId is present
});

export async function GET(request: Request) {
    if (request.method !== "GET") {
        return Response.json(
            {
                success: false,
                message: "Only GET method is allowed!"
            },
            { status: 405 }
        );
    }

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);

        // Extracting query params
        const queryParam = {
            username: searchParams.get("username"),
            clerkId: searchParams.get("clerkId")
        };

        // Validate the query params
        const result = usernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message: usernameErrors.length > 0
                        ? usernameErrors.join(', ')
                        : 'Invalid query parameters'
                },
                { status: 400 }
            );
        }

        const { username, clerkId } = result.data;

        // Find user with the given username
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            // Check if the username is used by a different user
            if (existingUser.clerkUserId !== clerkId) { 

                return Response.json(
                    {
                        success: false,
                        message: "Username already taken"
                    },
                    { status: 200 }
                );
            }
        }

        return Response.json(
            {
                success: true,
                message: "Username is unique"
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);

        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status: 500 }
        );
    }
}
